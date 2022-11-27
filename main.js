const chart = document.querySelector('.chart');
const chartSingleBlocks = chart.querySelectorAll('.chart-single');

async function getData(filename) {
	return await fetch(filename)
		.then((res) => res.json())
		.then((data) => data);
}

async function completeChart() {
	const data = await getData('data.json');

	let max = 0;
	for (let day of data) {
		if (max < day.amount) max = day.amount;
	}

	console.log(chartSingleBlocks);
	chartSingleBlocks.forEach((block, id) => {
		block.addEventListener('mouseover', () => {
			block.querySelector('.chart-single__amount').classList.add('active');
		});

		block.addEventListener('mouseout', () => {
			block.querySelector('.chart-single__amount').classList.remove('active');
		});

		const theAmount = block.querySelector('.chart-single__amount');
		const theBlock = block.querySelector('.chart-single__block');
		const percent = (data[id].amount / max).toFixed(2);

		theAmount.innerText = `$${data[id].amount}`;

		if (percent >= 1) theBlock.classList.add('most');
		theBlock.style.setProperty('--procent', percent);
	});
}

completeChart();

// 227.94

// 227.94 : number
