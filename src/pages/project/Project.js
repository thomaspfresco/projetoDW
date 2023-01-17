import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../api';
import { useNavigate } from "react-router-dom";

//import StorySection from '../../components/story-sections/StorySection.js';

import goback from "../../images/novelo.png"
import arrow from '../../images/a1.png';
import arrow2 from '../../images/a2.png';

function goUp() {
    window.scrollTo({
        top: window.scrollY-window.innerHeight,
        behavior: 'smooth',
    });
  }

  function goDown() {
	window.scrollTo({
		top: window.innerHeight+window.scrollY, 
		behavior: 'smooth',
	  });
  }

const Project = () => {
	const [conto, setProjectInfo] = useState(null);
	const [sections, setSection] = useState(null);
	const { slug } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		fetch(API_URL + `conto?slug=${slug}`)
		.then(response => response.json())
		.then(result => {
			//console.log(result[0].content.rendered);
			//console.log(result[0].content.rendered.split('<hr class="wp-block-separator has-alpha-channel-opacity"/>')[1]);

			//let aux1 = result[0].content.rendered.split('\n').slice(5,result[0].content.rendered.split('\n').length);

			//console.log(aux1);
			//let aux2 = [];

			/*for(let i = 0; i < aux1.length; i++) {
				console.log(aux1[i]);
				if (aux1[i] != "" && !aux1[i].includes("</a>") 
				&& !aux1[i].includes("<blockquote")
				&& !aux1[i].includes("</blockquote")) aux2.push(aux1[i]);
			}*/
			
			//console.log(aux2);

			const sectionsAux = [];

			let aux = result[0].content.rendered.split('<hr class="wp-block-separator has-alpha-channel-opacity"/>');

			for (let i = 1; i < aux.length; i++) {

				//console.log(aux[i]);
				
				let sect = aux[i].split('<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>');
				
				//console.log(sect[1].split("\n\n\n\n"));
				if (i == 1) {
					sectionsAux.push(
						<section>
							<div className="sectionImage" dangerouslySetInnerHTML={{__html:sect[0]}} />
							<div className="sectionText" dangerouslySetInnerHTML={{__html:sect[1]}} />
							<img className='arrow' id='arrowUp' src={arrow} onClick={goDown}></img>
						</section>
					);
				}
				else {
				sectionsAux.push(
					<section>
						<img className='arrow' id='arrowDown' src={arrow2} onClick={goUp}></img>
						<div className="sectionImage" dangerouslySetInnerHTML={{__html:sect[0]}} />
						<div className="sectionText" dangerouslySetInnerHTML={{__html:sect[1]}} />
						<img className='arrow' id='arrowUp' src={arrow} onClick={goDown}></img>
					</section>
				);
				}
			}
			
			setSection(sectionsAux);
			setProjectInfo(result)
		});
	}, [slug])

	if (!conto) {
		return null;
	}

	return (
		<>
		<div id="storyNav">
		<p id="storyTitle">{conto[0].title.rendered}</p>
		<img id='goBack' src={goback} onClick={() => navigate("/")}></img>
		
		</div>
		{sections}
		<section>
		<img className='arrow' id='arrowDown' src={arrow2} onClick={goUp}></img>
		fim.
		<p id="goBackText" onClick={() => navigate("/")}>voltar para a página principal</p>
		</section>
		</>
		)
	
	//<div dangerouslySetInnerHTML={{__html: conto[0]?.content?.rendered}} />
	//<img src={conto[0]?.acf?.image} width='100' alt={conto[0]?.acf?.client} />
}

export default Project;