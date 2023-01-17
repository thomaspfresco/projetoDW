import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import {color} from '../../pages/homepage/Homepage.js';

const ProjectList = ({ projects }) => {
	const navigate = useNavigate();
	return (
		<div className="scrollport">
				{projects.map(project => (
						<div key={project.slug} className='storyBlock' onClick={() => navigate(`/contos/${project.slug}`)}>
							<img className="capa" src={project.content.rendered.split('<hr class="wp-block-separator has-alpha-channel-opacity"/>')[0]
							.split('<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>')[color].split('"')[11]}></img>						
							<p className='title'>{project?.title?.rendered}</p>
						</div>
					))}
		</div>
		)
}

//<img className="capa" src={project.content.rendered.split(" ")[7].split('"')[1]}></img>

export default ProjectList;