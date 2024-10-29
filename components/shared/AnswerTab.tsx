import { getUserAnswers } from '../../lib/actions/user.action'
import { SearchParamsProps } from '../../types'
import AnswerCard from './cards/AnswerCard'

interface AnswersTabProps extends SearchParamsProps {
  userId: string
  clerkId?: string | null
}

const AnswersTab = async ({
  searchParams,
  userId,
  clerkId,
}: AnswersTabProps) => {
  const result = await getUserAnswers({ userId, page: 1 })
console.log(result.answers)
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          _id={item._id}
          clerkId={clerkId}
          question={item.question[0]}
          author={item.author}
          upvotes={item.upvotes}
          // views={item.views}
          // answers={item.answers}
          createdAt={item.createdAt}
        />
      ))}
    </>
  )
}

export default AnswersTab
