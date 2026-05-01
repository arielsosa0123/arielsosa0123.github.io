$(document).ready(function () {

	const icon = document.getElementById("gmailIcon");

	icon.addEventListener("click", function () {
		navigator.clipboard.writeText("arielsosa0123@gmail.com");

		icon.title = "Email Copied!";

		setTimeout(() => {
			icon.title = "Email";
		}, 7000);
	});

	let frame = 0;
	let row = 0;

	const frameWidth = 32;
	const frameHeight = 32;
	const totalFrames = 4;

	setInterval(function () {
		let x = -frame * frameWidth;
		let y = -row * frameHeight;

		$("#octopus").css("background-position", x + "px " + y + "px");
		frame = (frame + 1) % totalFrames;
	}, 200);

	function swimAcross() {
		let screenWidth = $(window).width();

		$("#octopus")
			.stop(true, true)
			.css({
				left: -100
			})
			.animate(
				{ left: screenWidth + 100 },
				10000,
				"linear",
				function () {
					setTimeout(swimAcross, 1000);
				}
			);
	}

	swimAcross();
});