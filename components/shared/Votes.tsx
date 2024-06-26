'use client'

import Image from 'next/image'
import React from 'react'
import { formatAndDivideNumber } from '../../lib/utils'
import { downvoteQuestion, upvoteQuestion } from '../../lib/actions/question.action'
import { usePathname, useRouter } from 'next/navigation'


interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  hasupVoted: boolean
  downvotes: number
  hasdownVoted: boolean
  hasSaved?: boolean
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasupVoted,
  downvotes,
  hasdownVoted,
  hasSaved
}: Props) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleSave = () => { }

  const handleVote = async (action: string) => {

    if (!userId) return;

    if (action === 'upvote') {
      if (type === 'question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        // await upvoteAnswer({
        //   questionId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname
        // })
      }
      // todo: show a toast message
      return
    }

    if (action === 'downvote') {
      if (type === 'question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        // await downvoteAnswer({
        //   questionId: JSON.parse(itemId),
        //   userId: JSON.parse(userId),
        //   hasupVoted,
        //   hasdownVoted,
        //   path: pathname
        // })
      }
      // todo: show a toast message
      return
    }

  }

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image
            src={hasupVoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
            height={18}
            width={18}
            alt='upvote'
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtitle-medium text-dark400_light900'>
              {formatAndDivideNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className='flex-center gap-1.5'>
          <Image
            src={hasdownVoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}
            height={18}
            width={18}
            alt='downvote'
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />
          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtitle-medium text-dark400_light900'>
              {formatAndDivideNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      <Image
        src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
        height={18}
        width={18}
        alt='star'
        className='cursor-pointer'
        onClick={handleSave}
      />
    </div>
  )
}

export default Votes