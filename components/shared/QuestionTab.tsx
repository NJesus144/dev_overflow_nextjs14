import { getUserQuestions } from "../../lib/actions/user.action";
import { SearchParamsProps } from "../../types";
import QuestionCard from "./cards/QuestionCard";


interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: QuestionTabProps) => {
  const result = await getUserQuestions({ userId, page: 1 })

  return (
    <>
      {result.questions.map((question) => (
          <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  )
}

export default QuestionTab