import React from 'react'
import './modalBox.scss'
import "react-datepicker/dist/react-datepicker.css";

interface Props extends React.HTMLAttributes<HTMLElement> {
	isOpenModal: boolean
	onCloseModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalBox = (props: Props): JSX.Element => {
	const { className, children, onCloseModal, isOpenModal } = props

	const isModalOpen = isOpenModal
		? `modal open ${className}`
		: `modal ${className}`

	const isModalContentOpen = isOpenModal
		? `modal__content open`
		: `modal__content`

	return (
		<div className={isModalOpen} onClick={() => onCloseModal(false)}>
			<div onClick={e => e.stopPropagation()} className={isModalContentOpen}>
				{children ?? ''}
			</div>
		</div>
	)
}
