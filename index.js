const fetch = require('node-fetch');
const fs = require('fs');

const getSpeechMp3Url = async text => {
	let headers = {
		'accept': '*/*',
		'accept-language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7',
		'cache-control': 'no-cache',
		'content-type': 'application/json',
		'pragma': 'no-cache',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'same-site'
	},
		body = {
			data: {
				text: text,
				speed: 1,
				voice: 'pt-BR-Standard-A'
			}
		},
		options = {
			headers: headers,
			referrer: 'https://texttospeech.wideo.co/',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: JSON.stringify(body),
			method: 'POST',
			mode: 'cors',
			credentials: 'omit'
		};

	const response = await fetch('https://texttospeechapi.wideo.co/api/wideo-text-to-speech', options);
	const json = await response.json();
	return json.result.url;
}

const downloadFile = async fileUrl => {
	try {
		const response = await fetch(fileUrl);
		return response.arrayBuffer();
	} catch (error) {
		console.log('downloadFile', error);
	}
}

const saveFile = async (buffer, fileName) => {
	try {
		await fs.writeFile(fileName, Buffer.from(buffer), () => { });
	} catch (error) {
		console.log('saveFile', error);
	}
}

const init = async () => {

	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	;
	[...alphabet].forEach(async letter => {
		console.log(`Letter: ${letter}`);
		console.log('Getting mp3 URL...');
		const audioUrl = await getSpeechMp3Url(letter);
		console.log('Downloading mp3 file...');
		const buffer = await downloadFile(audioUrl);
		if (buffer) {
			console.log('Saving mp3 file do disc...');
			await saveFile(buffer, `audio/mp3/${letter}.mp3`);
		}
	});

	// sentences.forEach(async sentence => {
	// 	console.log(`Sentence: ${sentence}`);
	// 	console.log('Getting mp3 URL...');
	// 	const audioUrl = await getSpeechMp3Url(sentence);
	// 	console.log('Downloading mp3 file...');
	// 	const buffer = await downloadFile(audioUrl);
	// 	if (buffer) {
	// 		console.log('Saving mp3 file do disc...');
	// 		await saveFile(buffer, `${sentence}.mp3`);
	// 	}
	// });

	// const audioUrl = await getSpeechMp3Url('_a_');
	// console.log('Downloading mp3 file...');
	// const buffer = await downloadFile(audioUrl);
	// if (buffer) {
	// 	console.log('Saving mp3 file do disc...');
	// 	await saveFile(buffer, `aaa.mp3`);
	// }
};

init();
