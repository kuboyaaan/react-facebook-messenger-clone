import { Card, CardContent, Typography } from '@material-ui/core'
import React, { forwardRef } from 'react'
import './Message.css';

// function Message({ username, message }) {
// forwardRefでラップする。functional Componentはrefを持っていないので。
const Message = forwardRef(({ username, message }, ref) => {
	const isUser = username === message.username;

	return (
		// ログインしているユーザーのみmessage_userのクラス名をつけ、スタイルを変える
		<Card
			ref={ref}
			className={`message ${isUser ? 'message_user' : 'message_guest'}`}
		>
			<CardContent>
				<Typography
						color='white'
						variant='h5'
						component='h2'
				>
					{/* 自分以外のメッセージには発信者をつける */}
					{!isUser && `${message.username}: ` } {message.message}
				</Typography>
			</CardContent>
		</Card>
	)
})

export default Message
