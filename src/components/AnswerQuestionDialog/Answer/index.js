
import Divider from "@material-ui/core/Divider";
import { useState } from "react";
import { useFirebase } from "../../../services/firebase";
import { useStores } from "../../../stores/";
import ProfilePicture from "../../ProfilePicture";
import Editor from "../../RichEditor";
import Answer from "./Answer";


const AnswerBlock = ({ answer, id, onAnswerUpdate }) => {
	const fb = useFirebase();
	const userStore = useStores().user;
	const uiStore = useStores().uiStore;

	const [editable, setEditable] = useState(false);
	const handleCancel = () => {
		setEditable(false);
	};


	const handleDelete = async () => {
		try {
			await fb.question.deleteAnswer(id, answer.id);
			uiStore.deployAlert("💩 You've deleted your answer 💩", "success");
		} catch (e) {
			uiStore.deployAlert(
				"Oh, there was an issue deleting your answer, tell Joe",
				"error"
			);
			console.log("error, could not delete answer", e);
		}
	};

	const handleUnvote = async (e) => {
		e.preventDefault();
		let newUpvotes = answer.upvotes.filter(
			(x) => x.uid !== userStore.user.uid
		);
		try {
			await fb.question.updateAnswer({ upvotes: newUpvotes }, id, answer.id);
		} catch (e) {
			uiStore.deployAlert(
				"Oh, there was an issue with un voting, tell Joe",
				"error"
			);
			console.log("error, could not delete answer", e);
		}
	};
	const handleUpvote = async () => {
		try {
			//updateAnswer(answer, questionId, id)
			let userVoted =
				answer.upvotes.filter((x) => x.uid === userStore.user.uid).length > 0;
			if (!userVoted) {
				await fb.question.updateAnswer(
					{
						upvotes: [
							...answer.upvotes,
							...[
								{
									uid: userStore.user.uid,
									photoURL: userStore.user.photoURL,
									firstName: userStore.user.firstName,
									lastName: userStore.user.lastName,
								},
							],
						],
					},
					id,
					answer.id
				);
			}
		} catch (e) {
			uiStore.deployAlert(
				"Oh, there was an issue with up voting, tell Joe",
				"error"
			);
			console.log("error, could not delete answer", e);
		}
	};



	return (
		<>
			<Answer
				answer={answer}
				onUpvote={handleUpvote}
				onUnvote={handleUnvote}
				showEdit={userStore.user.uid === answer.id}
				onUpdate={(type) =>
					type === "edit" ? setEditable(true) : handleDelete(answer.id)
				}
				photo={
					<ProfilePicture
						name={{ first: answer.firstName, last: answer.lastName }}
						photoURL={answer.photoURL}
						date={answer.created && answer.created.toDate()}
						size={50}
						center={false}
					/>
				}
			>
				<Editor
					readOnly={!editable}
					onSubmit={(answer) => onAnswerUpdate(answer, true)}
					onCancel={handleCancel}
					data={answer.data}
				/>
			</Answer>
			<Divider style={{ marginTop: "2%", marginBottom: "1%" }} />
		</>
	);
};

export default AnswerBlock;