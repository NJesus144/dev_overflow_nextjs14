'use client'

import Image from 'next/image'
import React, { useEffect } from 'react'
import { formatAndDivideNumber } from '../../lib/utils'
import { downvoteQuestion, upvoteQuestion } from '../../lib/actions/question.action'
import { usePathname, useRouter } from 'next/navigation'
import { downvoteAnswer, upvoteAnswer } from '../../lib/actions/answer.action'
import { toggleSaveQuestion } from '../../lib/actions/user.action'
import { viewQuestion } from '../../lib/actions/interaction.action'


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

  const handleSave = async (userId: string, itemId: string) => {
    if (!userId) return
    await toggleSaveQuestion({ userId: JSON.parse(userId), questionId: JSON.parse(itemId), path: pathname })
  }

  const handleVote = async (action: string) => {

    if (!userId) return;

    if (action === 'upvote') {
      if (type === 'Question') {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      }
      // todo: show a toast message
      return
    }

    if (action === 'downvote') {
      if (type === 'Question') {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      } else if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname
        })
      }
      // todo: show a toast message
      return
    }

  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    })
  }, [itemId, userId, pathname, router])

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
      {type === 'Question' && (
        <Image
          src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
          height={18}
          width={18}
          alt='star'
          className='cursor-pointer'
          onClick={() => handleSave(userId, itemId)}
        />
      )}
    </div>
  )
}

export default Votes