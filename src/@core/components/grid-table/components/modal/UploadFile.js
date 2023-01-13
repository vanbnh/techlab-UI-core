import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../bootstrap/Button';
import ModalComponent from '../../../modal';
import FileUploadS3Button from '../../../upload-s3/FileButton';

const ModalUploadFile = ({ setModal }) => {
	// *** REDUCER ***
	const { modal, entries, module } = useSelector((state) => state.gridTables);

	const closeModal = () => setModal(['upload', false]);

	return (
		<ModalComponent
			isOpen={modal.upload}
			close={closeModal}
			title={`Upload ${entries}`}
			Body={<FileUploadS3Button module={module} toggleModal={closeModal} />}
			Footer={
				<Button color='info' isOutline className='border-0' onClick={closeModal}>
					Close
				</Button>
			}
		/>
	);
};

export default ModalUploadFile;
