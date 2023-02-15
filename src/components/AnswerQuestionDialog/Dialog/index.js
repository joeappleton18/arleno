import MuiDialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
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
			<Typography gutterBottom variant="h6" className={classes.quote}>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

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

	const { open, title, children, classes } = props;

	const [isOpen, setIsOpen] = useState(open);

	const handleClose = () => {
		setIsOpen(false);
	}

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle onClose={handleClose}>
				{title}
			</DialogTitle>
			<DialogContent dividers>
				{children}
			</DialogContent>
		</Dialog>
	)
}

export default RenderDialog;