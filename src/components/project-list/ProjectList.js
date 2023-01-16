import { Link } from 'react-router-dom';

const ProjectList = ({ projects }) => {
	return (
		<div className="scrollport">
				{projects.map(project => (
						<div key={project.slug} className='storyBlock'>
							<img className="capa" src={project.content.rendered.split(" ")[7].split('"')[1]}></img>
						<Link to={`/contos/${project.slug}`}>
						<p className='title'>{project?.title?.rendered}</p>
						</Link>
						</div>
					))}
		</div>
		)
}

export default ProjectList;