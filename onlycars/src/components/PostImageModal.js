import React from "react";
import Modal from "react-modal";
import Slider from "react-slick";

const PostImageModal = ({ isOpen, onRequestClose, post }) => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: false,
		centreMode: true,
		className: "post-image-modal"
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			contentLabel="New Post"
			className="image-modal"
			overlayClassName="overlay"
		>
			{post && post.images && (
				<Slider {...settings} >
					{post.images.map((image, imgIndex) => (
						<img
							key={imgIndex}
							src={image}
							alt={`Post image ${imgIndex + 1}`}
						/>
					))}
				</Slider>
			)}
		</Modal>
	);
};

export default PostImageModal;
