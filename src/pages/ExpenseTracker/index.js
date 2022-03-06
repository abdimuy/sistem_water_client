import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import { CardContent } from '@material-ui/core';
import clientsServices from '../../services/waterAPI/clientsService';
import ChangeHistoryTwoToneIcon from '@material-ui/icons/ChangeHistoryTwoTone';
import DetailsTwoToneIcon from '@material-ui/icons/DetailsTwoTone';
import moment from 'moment';

const ExpenseTracker = () => {

  const [tracker, setTracker] = useState({});
  console.log({ tracker });

  const getExpenseTrackerData = async () => {
    try {
      const expensesAndIncomes = await clientsServices.getExpenseTracker();
      setTracker(expensesAndIncomes.body);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getExpenseTrackerData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center', width: '-webkit-fill-available', maxWidth: 1000 }}>
        <Typography
          align='left'
          component='h1'
          variant='h5'
          color='primary'
        >
          Ingresos y Egresos
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 15, maxWidth: 1000, width: '-webkit-fill-available', justifyContent: 'center' }}>
          <Card style={{ width: 300 }}>
            <CardHeader
              title='Balance actual'
            />
            <CardContent>
              <Typography
                align='center'
                component='h1'
                variant='h5'
                color='primary'
              >
                ${tracker?.balance?.totalBalance}
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: 300 }}>
            <CardHeader
              title={
                <>
                  <ChangeHistoryTwoToneIcon style={{ color: 'green' }} />
                  Ingresos
                </>
              }
              subheader={`Del ${moment().subtract(1, 'month').format('L')} al ${moment().format('L')}`}
            />
            <CardContent>
              <Typography
                align='center'
                component='h1'
                variant='h5'
                style={{ color: 'green' }}
              >
                ${tracker?.incomesByMonth}
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: 300 }}>
            <CardHeader
              title={
                <>
                  <DetailsTwoToneIcon style={{ color: 'red' }} />
                  Egresos
                </>
              }
              subheader={`Del ${moment().subtract(1, 'month').format('L')} al ${moment().format('L')}`}
            />
            <CardContent>
              <Typography
                align='center'
                component='h1'
                variant='h5'
                style={{ color: 'red' }}
              >
                ${tracker?.expensesByMonth}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;