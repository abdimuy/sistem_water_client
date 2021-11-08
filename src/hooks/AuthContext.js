import React, { useContext, useState, useEffect } from 'react';
import clientsServices from '../services/waterAPI/clientsService';

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {

	const [currentUser, setCurrentUser] = useState(null);
	console.log({ currentUser });
	// const [rolesUser, setRolesUser] = useState();
	const [loading, setLoading] = useState(true);

	// const signup = (email, password) => {
	//   return fbAuth.createUserWithEmailAndPassword(email, password)
	// }

	// const login = (email, password) => {
	//   return fbAuth.signInWithEmailAndPassword(email, password)
	// }

	const logout = () => {
		clientsServices.logout()
			.then((res) => {
				console.log(document.cookie);
				document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
				console.log('Logout')
			})
			.then(() => {
				setCurrentUser(null);
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleIsAuthenticated = () => {
		return new Promise((resolve, reject) => {
			resolve(clientsServices.isAuthenticated().then(res => {
				setCurrentUser(res);
				setLoading(false);
			})
				.catch(err => {
					console.log(err);
					setCurrentUser(null);
					setLoading(false);
				}))
		})
	};

	useEffect(() => {
		const handleUseEffect = async () => {
			await handleIsAuthenticated();
		}
		handleUseEffect();
		// clientsServices.isAuthenticated().then(user => {
		//   if (user) {
		//     setCurrentUser(user);
		//     setLoading(false);
		//   } else {
		//     setLoading(false);
		//   }
		// })
		//   .catch(error => {
		//     console.log(error);
		//     setLoading(false);
		//   })
	}, []);

	// useEffect(() => {
	//   const unsubscribe = fbAuth.onAuthStateChanged(user => {
	//     setCurrentUser(user)
	//     if(user) {
	//       user.getIdTokenResult().then(token => {
	//         setRolesUser(token.claims);
	//         console.log(token);
	//       })
	//     }
	//     setLoading(false);
	//   })

	//   return unsubscribe
	// }, [])

	const value = {
		currentUser,
		logout,
		handleIsAuthenticated
	}
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
