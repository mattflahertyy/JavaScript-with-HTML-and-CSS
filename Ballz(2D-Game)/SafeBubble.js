class SafeBubble {
	constructor() {
		this.radius = 15;
		this.positionBubble();
	}

	draw() {
		context.beginPath();
		this.colours = [44, 250, 72]
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.closePath();
		context.strokeStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.75)`;
		context.fillStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.25)`;
		context.lineWidth = 3;
		context.stroke();
		context.fill();
	}

	update() {
		this.draw();
	}

	isSafe(playerbubble)
	{
		let gap = this.calculateDistance(playerbubble);
		
		if(gap <= (this.radius + playerbubble.radius))
			return true;
		
		else
		return false;
	}

	deleteSafeBubble(currentSafeBubble)
	{
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	calculateDistance(playerbubble) {
		let distance = Math.hypot(this.x - playerbubble.x, this.y - playerbubble.y);
		return distance;
	}

	positionBubble() {
		this.x = this.radius + (Math.random() * (canvas.width - (this.radius * 2)));
		this.y = this.radius + (Math.random() * (canvas.height - (this.radius * 2)));
	}
}