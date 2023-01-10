class PlayerBubble {
	constructor() {
		this.radius = 20;
		this.colours = [37, 0, 214];
		this.speed = 0;
		this.maxSpeed = 5;
		this.friction = 0.95;
		this.positionBubble();
    }

	draw(timer) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
		context.strokeStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.75)`;
		context.fillStyle = `rgba(${this.colours[0]}, ${this.colours[1]}, ${this.colours[2]}, 0.25)`;
		context.lineWidth = 3;
        context.stroke();
        context.fill();
	}

	update(bubbles) {
		this.checkBounds();
		this.draw();
	}

	checkBounds() {
		if ((this.x + this.radius) >= canvas.width) {
			this.x = canvas.width - this.radius;
		}

		if ((this.x - this.radius) <= 0) {
			this.x = this.radius;
		}

		if ((this.y + this.radius) >= canvas.height) {
			this.y = canvas.height - this.radius;
		}

		if ((this.y - this.radius) <= 0) {
			this.y = this.radius;
		}
	}

	positionBubble() {       
        this.x = 400;
        this.y = 700;
	}

	move(direction)
	{
		if (direction == 1)
		{
			this.y = this.y - 5;
		}

		if (direction == 2)
		{
			this.y = this.y + 5;
		}

		if (direction == 3)
		{
			this.x = this.x - 5;
		}

		if (direction == 4)
		{
			this.x = this.x + 5;
		}
	}
}