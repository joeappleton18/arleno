import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import highlightSVG from '../../assets/customIcons/highlight.svg';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    popOver: {
        background: 'rgb(41, 41, 41)',
        borderRadius: '3px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
    },
    margin: {
        margin: theme.spacing(1),
    },
    highlightSVG: {

        width: '25px',
        height: '25px',

    },
}));


const TextPopOver = (props) => {

    const classes = useStyles();
    const { anchorPosition, onClose, onHighlight, id, open } = props;


    return (
        <Popover
            elevation={1}
            anchorReference="anchorPosition"
            anchorPosition={anchorPosition}
            id={id}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
                alignItems: 'center'
            }}
        >
            <div className={classes.popOver}>
                <IconButton aria-label="delete" onClick={onHighlight} className={classes.margin}>
                    <img src={highlightSVG} className={classes.highlightSVG} />
                </IconButton>
            </div>

        </Popover>
    );





}

export default TextPopOver;