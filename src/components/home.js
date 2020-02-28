import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import PersonIcon from '@material-ui/icons/Person';
import DataTable from '../components/table'
import axios from 'axios';
import cheerio from 'cheerio';



const useStyles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    logo:{
        maxWidth: 200,
    }
  });

class Home extends Component { 

    constructor(){
        super()
        this.state={
            data:[]
        }
    }
   
    UNSAFE_componentWillMount() {
        this.getData()
    }
    async getData(){
        //using https://cors-anywhere.herokuapp.com to avoid cors errors 😅😅
        const URL = 'https://cors-anywhere.herokuapp.com/https://www.premierleague.com/tables';
        var data=[];
        await axios.get(URL).then(response => {
            
            const $=cheerio.load(response.data);
            var table = $("table tbody");
            $("table tbody tr:nth-child(2n)").remove();
            table.find('tr').each(function(i, el) {
                if(i<20){
                    var $tds = $(this).find('td');
                    data.push({
                        position : $tds.eq(1).children('span').first().text(),
                        club : $tds.eq(2).find('.long').text(),
                        shortName : $tds.eq(2).find('.short').text(),
                        played : $tds.eq(3).text(),
                        won : $tds.eq(4).text(),
                        draw : $tds.eq(5).text(),
                        lost : $tds.eq(6).text(),
                        points : $tds.eq(10).text(),
                        next : $tds.eq(12).find('.visuallyHidden').text()
                    });
                    // var position = $tds.eq(1).children('span').first().text()
                    // var club = $tds.eq(2).find('.long').text()
                    // var shortName = $tds.eq(2).find('.short').text()
                    // var played = $tds.eq(3).text()
                    // var won = $tds.eq(4).text()
                    // var draw = $tds.eq(5).text()
                    // var lost = $tds.eq(6).text()
                    // var points = $tds.eq(10).text()
                    // var next = $tds.eq(12).find('.visuallyHidden').text()
                    // console.log(position,club,shortName,played,won,draw,lost,points,next)
                }
            });
            // return data;
            
        }).catch(err=>{
            console.log(err);
        });
        this.setState({data:data});
    }

    render(){
        // const data =this.props.data;
        const {classes} = this.props;
        // console.log(data.data)  
        return (
            <div>
                <div className={classes.root}>
                    <AppBar position="static"  color="secondary">
                        <Toolbar>
                        <img className={classes.logo}  src="https://lh3.googleusercontent.com/proxy/3NL4C9mdz-5Aq6gY6QuCfq2D-COQxiyJfkIaoF7OZAgtJfD3ESHZ-SFvLGD-DCYoLzPoZIScse054cDo7CtFCHClOZxdMqMtvGVgLKDUVj_CsyZUOFhvYrbwjHLgdvI" alt=''/>
                        </Toolbar>
                    </AppBar>
                </div>
                <DataTable data={this.state.data}/>
                {/* {data && data.length>0? <DataTable data={data}/>:'Loading...'} */}
            </div>
        )
    }
    
}



export default withStyles(useStyles)(Home)