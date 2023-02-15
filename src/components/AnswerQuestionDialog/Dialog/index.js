import { Grid } from "@material-ui/core";
import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(3),
		background: "white",
	},

	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
		background: `linear-gradient(45deg, #03A9F4 30%, #B3E5FC 90%)`,
	},
	quote: {
		fontStyle: "italic",
		color: "grey !important",
		"& *": {
			fontSize: "20px",
			fontWeight: "bolder",
		},
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, title, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>

			<Grid container spacing={1} style={{ display: "flex" }}>
				<Grid xs={11}>
					<Typography gutterBottom variant="h6" className={classes.quote}>
						{children}
					</Typography>
				</Grid>
				<Grid xs={1}>
					<IconButton
						aria-label="close"
						className={classes.closeButton}
						onClick={onClose}
					>
						<CloseIcon />
					</IconButton>

				</Grid>


			</Grid>
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);



const Dialog = withStyles((theme) => ({
	root: {
		backdropFilter: "blur(8px)",
	},

	paper: {
		width: "70vw",
		height: "80vh",
		backgroundColor: "#D8D8D8",
	},
	paperWidthSm: {
		maxWidth: "3000px",
	},
}))(MuiDialog);

const RenderDialog = (props) => {

	const { open, title, children, onClose } = props;

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle onClose={onClose}>
				{title}
			</DialogTitle>
			<DialogContent dividers>
				{children}
			</DialogContent>
		</Dialog>
	)
}

export default RenderDialog;