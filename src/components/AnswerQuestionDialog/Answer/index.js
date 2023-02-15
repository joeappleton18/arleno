import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import UpdateDeleteToggle from "../../UpdateDeleteToggle";
import { AnswerSection } from './AnswerSection';

export const useStyles = makeStyles((theme) => ({

	photoSection: {
		display: "flex",

	},


}))


const Answer = (props) => {
	const { answer, photo, children, onUpdate, showEdit, onUpvote, onUnvote } = props;
	const classes = useStyles();
	const handleEditDelete = (item) => {
		onUpdate(item.toLowerCase());
	}

	return (
		<Grid container spacing={0}>

			<Grid item xs={12} className={classes.photoSection}>
				{photo}
				{showEdit &&
					<UpdateDeleteToggle onDelete={() => handleEditDelete('delete')} onEdit={() => handleEditDelete('edit')} />

				}

			</Grid>

			<Grid item xs={12}>
				{children}
			</Grid>
			<AnswerSection upvotes={answer.upvotes} onUnvote={(e) => onUnvote(e)} onUpvote={() => onUpvote()} />

		</Grid >
	);
};

Answer.defaultProps = {
	showEdit: false
}

export default Answer;