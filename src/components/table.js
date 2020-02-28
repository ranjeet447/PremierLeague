import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
    paper: {
		
        alignItems: 'center',
        width: '100%',
    },
    table: {
        minWidth: 650,
      },
  }));

const DataTable = (props) =>{
    const classes = useStyles();
    const data=props.data
    function predict(team1,name){
        let team2={}
        let i =data.findIndex(team => team.club === name);
        if (i === -1) {
            return `🤐 No data about ${name}`
        }else{
            team2=data[i];
        }
        //   console.log(team2)
        if(team1.won/team1.played>team2.won/team2.played){
            return 'WIN'
        }else if(team1.won/team1.played<team2.won/team2.played){
            return 'LOSE';
        }else{
            if(team1.lost/team1.played>team2.lost/team2.played){
                return 'LOSE'
            }else if(team1.lost/team1.played<team2.lost/team2.played){
                return 'WIN';
            }else{
                return 'DRAW';
            }
        }
    }
    return (
        <div className={classes.root}>
           <TableContainer component={Paper}>
            <Table>
           <TableHead>
                <TableRow>
                    <TableCell>Position</TableCell>
                    <TableCell>Club</TableCell>
                    <TableCell align="right">played</TableCell>
                    <TableCell align="right">Won</TableCell>
                    <TableCell align="right">Draw</TableCell>
                    <TableCell align="right">Lost</TableCell>
                    <TableCell align="right">Points</TableCell>
                    <TableCell>Next Match</TableCell>
                    <TableCell align="right">Result</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.length> 0 ?
                    data.map((row,i) => (
                        <TableRow key={i}>
                        <TableCell component="th" scope="row">{row.position}</TableCell>
                    <TableCell component="th" scope="row">{row.club} ({row.shortName})</TableCell>
                        <TableCell align="right">{row.played}</TableCell>
                        <TableCell align="right">{row.won}</TableCell>
                        <TableCell align="right">{row.draw}</TableCell>
                        <TableCell align="right">{row.lost}</TableCell>
                        <TableCell align="right">{row.points}</TableCell>
                        <TableCell>{row.shortName} vs {row.next}</TableCell>
                        <TableCell align="right">{predict(row,row.next)}</TableCell>
                        </TableRow>
                    ))
                     :
                    <TableRow>
                        <TableCell align="center" colSpan={8}>Loading...</TableCell>
                    </TableRow>
                        
                }
            </TableBody>
            </Table>
           </TableContainer>
         </div>
    )
}

export default DataTable;