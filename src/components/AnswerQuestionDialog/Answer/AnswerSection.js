import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import UpArrowFilled from '@material-ui/icons/Forward';
import UpArrow from '@material-ui/icons/ForwardOutlined';
import { useEffect, useState } from 'react';
import { useStores } from "../../../stores/";
import AvatarGroup from "../../AvatarGroup/";

export const useStyles = makeStyles((theme) => ({
	likeIcon: {
		color: theme.palette.primary.main,
		cursor: "pointer",
		transform: 'rotate(270deg)',
		marginBottom: theme.spacing(3)
	},
}))

export const AnswerSection = ({ upvotes, onUpvote, onUnvote }) => {

	const classes = useStyles();
	const userStore = useStores().user;
	const [arrowActive, setArrowActive] = useState(false);
	const [userVoted, setUserVoted] = useState(false);


	useEffect(() => {
		let userVoted = (upvotes.filter(x => x.uid === userStore.user.uid)).length > 0;
		setArrowActive(userVoted);
		setUserVoted(userVoted);
	}, [upvotes]);


	return (<Grid container direction="row" >
		<Grid item xs={9} md={5} style={{ display: 'flex' }}>
			{userVoted && (<span onClick={(e) => onUnvote(e)}>
				<UpArrowFilled className={classes.likeIcon} />

			</span>)}

			{!userVoted && (<span onClick={(e) => onUpvote(e)} onMouseEnter={() => setArrowActive(true)} onMouseLeave={() => setArrowActive(false)}>
				{arrowActive && <UpArrowFilled className={classes.likeIcon} />}

				{!arrowActive && <UpArrow className={classes.likeIcon} />}

			</span>)}

			<Typography variant="p" style={{ color: "grey", lineHeight: 1, marginTop: "10px" }}> Upvotes  </Typography>
			<Typography style={{ color: "grey", lineHeight: 1, marginTop: "10px" }} variant={'p'}>   ({upvotes.length}) </Typography>
			<AvatarGroup
				style={{ marginLeft: "0.8%", marginBottom: '1%', marginTop: "1.5%" }}
				photos={upvotes}
				onlineBadge={false}
				max={10}
				size={30}
			/>

		</Grid>


		<Divider style={{ marginTop: "2%" }} />
	</Grid>);
};
AnswerSection.defaultProps = {
	upvotes: []
};
