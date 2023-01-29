import { useState, useEffect } from 'react';
import { API_URL } from '../../api';

import ProjectList from '../../components/project-list/ProjectList';

import arrow from '../../images/a1.png';
import arrow2 from '../../images/a2.png';
import lupa from '../../images/lupa.png';

const logo_red = require('../../images/logo-red.png');
const logo_yellow = require('../../images/logo-yellow.png');
const logo_blue = require('../../images/logo-blue.png');

const novelo_red = require('../../images/novelo-red.gif');
const novelo_yellow = require('../../images/novelo-yellow.gif');
const novelo_blue = require('../../images/novelo-blue.gif');

const logos = { logo_red, logo_yellow, logo_blue };
const novelos = { novelo_red, novelo_yellow, novelo_blue}

var color = 0;

/*function reload() {
	window.location.reload(false);
}*/

function goUp() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
  }

  function goDown() {
	window.scrollTo({
		top: document.body.offsetHeight, 
		behavior: 'smooth',
	  });
  }

const Homepage = () => {
	const [projects, setProjects] = useState(null);
	const [categories, setCategories] = useState(null);
	const [loading, setLoading] = useState(true);

	const [logo, setLogo] = useState(logos.logo_red);
	const [novelo, setNovelo] = useState(novelos.novelo_red);

function changeToRed() {
	document.getElementById("circleRed").style.borderWidth = '3px';
	document.getElementById("circleYellow").style.borderWidth = '0px';
	document.getElementById("circleBlue").style.borderWidth = '0px';
	
	setLogo(logos.logo_red);
	setNovelo(novelos.novelo_red);
	color = 0;
	}
	
	function changeToYellow() {
		document.getElementById("circleRed").style.borderWidth = '0px';
		document.getElementById("circleYellow").style.borderWidth = '3px';
		document.getElementById("circleBlue").style.borderWidth = '0px';
	
		setLogo(logos.logo_yellow);
		setNovelo(novelos.novelo_yellow);
		color = 1;
	}
	
	function changeToBlue() {
		document.getElementById("circleRed").style.borderWidth = '0px';
		document.getElementById("circleYellow").style.borderWidth = '0px';
		document.getElementById("circleBlue").style.borderWidth = '3px';
		
		setLogo(logos.logo_blue);
		setNovelo(novelos.novelo_blue);
		color = 2;
	}

	const fetchProjects = async () => {
		setLoading(true);
		await fetch(API_URL + `conto`)
			.then(response => response.json())
			.then(result => {
				//console.log(result[4].content.rendered.split('<hr class="wp-block-separator has-alpha-channel-opacity"/>')[0].split('<div style="height:100px" aria-hidden="true" class="wp-block-spacer"></div>')[0].split('"')[11]);
				setProjects(result)
				setLoading(false)
			});
	}

	const fetchCategories = async () => {

		await fetch(API_URL)
			.then(response => response.json())
			.then(result => {
				setCategories(result)
			});
	}

	const searching = async () => {
		setLoading(true);
		await fetch(API_URL + `conto`)
			.then(response => response.json())
			.then(result => {
				let pesquisa = document.getElementById('search').value;
				let resultFinal = [];
				for (const proj of result) {
					if (proj.title.rendered.toUpperCase().includes(pesquisa.toUpperCase())) {
					resultFinal.push(proj);
				}
			}
				setProjects(resultFinal)
				setLoading(false)
			});
	}

	useEffect(() => {
		fetchProjects();
		fetchCategories();
		searching();
	}, [])

	if (!projects || !categories) {
		return null;
	}

	const projectList = !loading ? (
		<ProjectList projects={projects} />
	) : (
		<h2>Loading...</h2>
	)

	return (
		<>
		<section>
		<img id='logo' src={logo} onClick={fetchProjects}></img>
		<input  type="text" id="search" placeholder="pesquisar"></input>
		<img id='lupa' src={lupa} onClick={searching}></img>
		  <div className="storyList">
		  {projectList}
		  </div>
		  <img className='arrow' id='arrowUp' src={arrow} onClick={goDown}></img>
		  <p id="slogan">quem conta um conto, acrescenta um ponto</p>
		</section>
		
		<section>
		<img id='novelo' src={novelo}></img>
		<img className='arrow' id='arrowDown' src={arrow2} onClick={goUp}></img>
		<div className='circle' id='circleRed' onClick={changeToRed}></div>
		<div className='circle' id='circleYellow' onClick={changeToYellow}></div>
		<div className='circle' id='circleBlue' onClick={changeToBlue}></div>
  		<p id="info">.Conto propõe uma forma alternativa de contar histórias para crianças. É uma coleção de reintrepretações de contos clássicos, do texto às ilustrações, com uma forte componente didática e interativa. Surge em contexto académico, na cadeira de Desenvolvimento Web do Mestrado em Design e Multimédia na Universidade de Coimbra. 
			Resulta do trabalho de <a className="linksPessoais" href="https://www.linkedin.com/in/inesazevedo-ia/" target="_blank" rel="noopener noreferrer">Inês Azevedo</a>, <a className="linksPessoais" href="https://www.linkedin.com/in/mariana-pombo-58694a234/" target="_blank" rel="noopener noreferrer">Mariana Pombo</a> e <a className="linksPessoais" href="https://www.instagram.com/thomaspfresco/" target="_blank" rel="noopener noreferrer">Thomas Fresco</a>.</p>
		</section>
		</>
	)
}

export {color};
export default Homepage