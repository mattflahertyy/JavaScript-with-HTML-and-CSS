class EnemyBubble {
	constructor() {
		this.radius = 8;
		this.velocity = {
			x: (Math.random() - 0.5) * 5,
			y: (Math.random() - 0.5) * 5
		}
		this.positionBubble();
	}

	draw() {
		context.beginPath();
		this.colours = [211, 0, 2]
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		context.closePath();
		context.strokeStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.75)`;
		context.fillStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.25)`;
		context.lineWidth = 3;
		context.stroke();
		context.fill();
	}

	update(bubbles) {
		this.draw();
		this.checkBounds();

		this.x += this.velocity.x;
		this.y += this.velocity.y;

		
	}

	checkBounds() {
		if ((this.x + this.radius) > canvas.width || (this.x - this.radius) < 0) {
			this.velocity.x = -this.velocity.x;
		}

		if ((this.y + this.radius) > canvas.height || (this.y - this.radius) < 0) {
			this.velocity.y = -this.velocity.y;
		}
	}

	isDead(playerbubble)
	{
		let gap = this.calculateDistance(playerbubble);
		
		if(gap <= (this.radius + playerbubble.radius))
			return true;
		
		else
		return false;
	}

	calculateDistance(playerbubble) {
		let distance = Math.hypot(this.x - playerbubble.x, this.y - playerbubble.y);
		return distance;
	}

	positionBubble(playerbubble) {
		if (playerBubble.y > 400)
		{
			this.x = this.radius + (Math.random() * ((canvas.width) - (this.radius * 2)));
			this.y = this.radius + (Math.random() * (500 - (this.radius * 2)));
		}
		else if (playerBubble.y < 400)
		{
			this.x = this.radius + (Math.random() * ((canvas.width) - (this.radius * 2)));
			//this.y = this.radius + (Math.random() * (600 - (this.radius * 2)));
			this.y = 700;
		}
		
	}
}