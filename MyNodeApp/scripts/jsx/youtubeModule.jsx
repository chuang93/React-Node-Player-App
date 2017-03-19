import React from 'react';


const YoutubeModule = ({id}) => {

return (
	<div> {id} </div>
	);
};

YoutubeModule.propTypes= {
	id:React.PropTypes.string.isRequired
};

export default YoutubeModule;