import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { getDomain } from "../../utils";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { FirebaseContext } from "../../firebase";

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push("/login");
    } else {
      const voteRef = firebase.db.collection("links").doc(link.id);
      voteRef.get().then(doc => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = {
            votedBy: {
              id: user.uid,
              name: user.displayName
            }
          };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length;
          voteRef.update({ votes: updatedVotes, voteCount });
        }
      });
    }
  }

  function handleDeleteLink() {
    const linkRef = firebase.db.collection("links").doc(link.id);
    linkRef
      .delete()
      .then(() => console.log(`Document with id: ${link.id} was deleted!`))
      .catch(err => console.log(err));
  }

  const postedByAuthUser = user && user.uid === link.postedBy.id;

  return (
    <div className="flex item-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}</span>}
        <div className="vote-button" onClick={handleVote}>
          👍
        </div>
        <div className="ml1">
          <div>
            {link.description}{" "}
            <span className="link">({getDomain(link.url)})</span>
          </div>
          <div className="f6 lh-copy gray">
            {link.voteCount} votes by {link.postedBy.name}{" "}
            {distanceInWordsToNow(link.created)}
            {" | "}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0
                ? `${link.comments.length} comments`
                : "discuss"}
            </Link>
            {postedByAuthUser && (
              <React.Fragment>
                {" | "}
                <span className="delete-button" onClick={handleDeleteLink}>
                  Delete
                </span>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
