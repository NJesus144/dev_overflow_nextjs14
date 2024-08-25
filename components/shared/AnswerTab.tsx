import { getUserAnswers } from "../../lib/actions/user.action";
import { SearchParamsProps } from "../../types";
import AnswerCard from "./cards/AnswerCard";
import QuestionCard from "./cards/QuestionCard";


interface AnswersTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: AnswersTabProps) => {
  const result = await getUserAnswers({ userId, page: 1 })

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId}
          title={item.question[0].title}
          author={item.author}
          upvotes={item.upvotes}
          views={item.views}
          answers={item.answers}
          createdAt={item.createdAt}
        />
      ))}
    </>
  )
}

export default AnswersTab