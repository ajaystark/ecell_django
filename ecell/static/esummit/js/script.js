let origTop = null,
    origLh = null;

function rand(low, high) {
    return low + Math.random() * (high - low);
}

window.waves = {
    canHeight: 200,
    amplitude: 150,
    waveBase: 50,
    can: null,
    ctx: null,
    wave: [
        [2, 1, -1],
        [4, 1, -1],
        [3, 0, 1],
        [5, 0, 1]
    ],
    resol: 3,
    ptr: 0,
    color: '#ff537199',
    speed: 0.05,
    moveSpeed: 2,
    setSize: function() {
        if (window.innerWidth < 650) {
            this.canHeight = 110;
            this.waveBase = 60;
            this.amplitude = 50;
        }
        this.can.height = this.canHeight;
        this.can.width = window.innerWidth;
    },
    init: function() {
        this.can = $('#waves')[0];
        this.ctx = this.can.getContext('2d');
        this.setSize();
    },
    render: function() {
        this.can.height = this.can.height;
        this.ctx.fillStyle = this.color;
        for (let i = 0; i < this.wave.length; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.can.height);
            for (let x = 0; x < window.innerWidth; x += this.resol) {
                let waveVal = Math.exp(Math.sin(this.wave[i][0] * (this.ptr + x) * 2 * Math.PI / window.innerWidth)) / Math.E * this.amplitude * this.wave[i][1];
                let y = this.can.height - (this.waveBase + waveVal)
                this.ctx.lineTo(x, y);
            }
            this.ctx.lineTo(this.can.width, this.can.height)
            this.ctx.closePath();
            this.ctx.fill();
        }
    },
    update: function() {
        waves.render();
        if (waves.ptr >= window.innerWidth) {
            waves.ptr = 0;
        } else {
            waves.ptr += waves.moveSpeed;
        }
        for (let i = 0; i < waves.wave.length; i++) {
            let w = waves.wave[i];
            if (w[2] > 0) {
                if (w[1] >= 1) {
                    waves.wave[i][2] = -1;
                } else {
                    waves.wave[i][1] += waves.speed / w[0];
                }
            } else {
                if (w[1] <= 0) {
                    waves.wave[i][2] = 1;
                } else {
                    waves.wave[i][1] -= waves.speed / w[0] / w[0];
                }

            }
        }
    }
};

window.stars = {
    num: 256,
    stars: [],
    rad: 4,
    maxLen: 30,
    color: '#ff5371aa',
    velocity: 2.5,
    can: null,
    ctx: null,

    setSize: function() {
        this.can.height = $('#page-4').outerHeight();
        this.can.width = $('#page-4').outerWidth();
        this.stars = [];
        let sq = Math.sqrt(this.num);
        for (let i = 1; i <= sq; i++) {
            for (let j = 1; j < sq; j++) {
                let x = j * this.can.width / sq;
                let y = i * this.can.height / sq;
                let len = rand(this.rad, this.maxLen);
                let velocity = this.velocity + rand(-1, 1);
                this.stars.push([x, y, len, velocity]);
            }
        }
    },

    init: function() {
        this.can = $('#stars')[0];
        this.ctx = this.can.getContext('2d');
        this.setSize();
    },

    render: function() {
        this.can.height = this.can.height;
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.rad;
        this.ctx.lineCap = 'round';
        for (let i = 0; i < this.stars.length; i++) {
            let s = this.stars[i];
            this.ctx.beginPath();
            this.ctx.moveTo(s[0], s[1]);
            this.ctx.lineTo(s[0], s[1] + s[2]);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    },
    update: function() {
        stars.render();
        for (let i = 0; i < stars.stars.length; i++) {
            let s = stars.stars[i];
            if (s[1] + s[2] >= stars.can.height) {
                stars.stars[i][1] = -s[2];
            } else {
                stars.stars[i][1] += stars.stars[i][3];
            }
        }
    }
}

window.events = {
    status: false,
    speed: 650,
    easing: 'easeOutExpo',
    init: function() {

        $('#event').velocity({
            'scaleX': '0.8',
            'scaleY': '0.8',
        }, 0);
    },
    open: function($e) {
        $('#event-dis').css('display', 'block');

        let id = Number($e.attr('id').substr(13));
        $("#event-desc").html(eventData[id - 1]);
        $('#event-head').text($e.find('h3').text());

        this.status = true;
        $('#event-dis').velocity({
            'opacity': '1'
        }, {
            duration: events.speed,
            easing: events.easing
        });

        $('#event').velocity({
            'scaleX': '1',
            'scaleY': '1',
            'top': '0px;'
        }, {
            duration: events.speed,
            easing: events.easing
        });

    },
    close: function() {
        this.status = false;
        $('#event-dis').velocity({
            'opacity': '0'
        }, {
            duration: events.speed,
            easing: events.easing
        });

        $('#event').velocity({
            'scaleX': '0.8',
            'scaleY': '0.8',
            'top': '30%'
        }, {
            duration: events.speed,
            easing: events.easing
        });

        setTimeout(() => {
            if (events.status === false) {
                $('#event-dis').css('display', 'none');
            }
        }, this.speed);

    }
};


let eventData = [
    `
	<p><span style="font-weight: 400;">Description:&nbsp;</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">&ldquo;There is nothing more profound than creating something out of nothing.&rdquo;</span></p>
	<p><span style="font-weight: 400;">ESummit&rsquo;20 brings to you &lsquo;Productathon&rsquo;, an&nbsp; entrepreneurial hackathon that aims to provide a platform to create world class products combined with realistic business models which would enable those products to thrive in the market.</span></p>
	<p><span style="font-weight: 400;">&ldquo;The secret to building great products is not creating awesome features, it&rsquo;s to make your users awesome!&rdquo;</span></p>
	<p><span style="font-weight: 400;">Registration is opening soon!</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Prize: </span><span style="font-weight: 300;">To be announced</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Team Size: </span><span style="font-weight: 300;">3-5 people</span></p>
	<p>&nbsp;</p>
	<p><strong>Overview</strong></p>
	<p><span style="font-weight: 400;">Tagline</span></p>
	<p><span style="font-weight: 300;">Where ideas become reality!</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">What is it about?</span></p>
	<p><span style="font-weight: 300;">A 16 hour hackathon product based hackathon which aims to provide a platform to execute creative ideas in a short time-span while creating models to ensure the products success in the real world. We hope that participants come up with out of the box solutions to improve our society&rsquo;s social well being.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Phase Description</span></p>
	<p><span style="font-weight: 400;">Pitch Phase</span></p>
	<p><span style="font-weight: 300;">Some broad problem statements will be given to the participants on the site and they will be asked to form teams if they haven&rsquo;t already. All the teams would be asked to pitch their ideas to the venture capitals, even demonstrate a very basic prototype of the product they aim to build. They can take help mentors present on the site and keep in mind how they plan to bring their product to market and also sustain it. After they get a green flag from the venture capitals, they can proceed to the hacking phase and work towards actually building the product. All the teams would be allocated a budget according to which they can plan their market strategies which will also play a key role in the design and build of their product</span><span style="font-weight: 400;">.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Hack Phase</span></p>
	<p><span style="font-weight: 300;">Now that all the business is sorted, all the teams would be asked to specifically focus on building their products.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Rules</span></p>
	<ol>
	<li style="font-weight: 400;"><span style="font-weight: 300;">Each team should consist of at least 2 and at most 4 members.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 300;">There is no restriction over the kind of product a team wants to build (Hardware or Software), but the teams would have to bring their material (laptops, cables, modules, microprocessors, etc.) to build them. A few extension cords and LAN cables would be provided. Mattresses will be available for resting/sleeping.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 300;">Using pre-builds or boilerplate code will be allowed but the team must properly acknowledge its use and get it verified by the organisers before they start hacking.</span></li>
	<li style="font-weight: 300;"><span style="font-weight: 300;">All teams must take their deadlines given to them seriously, no submissions will be accepted once the deadline has passed.</span></li>
	<li style="font-weight: 300;"><span style="font-weight: 300;">The ultimate decision regarding awards and prizes lies within the hands of the jury. The decision of organizers will be final and binding.</span></li>
	</ol>
	<p><br /><br /></p>
	<p><span style="font-weight: 400;">Participation fees</span></p>
	<p><span style="font-weight: 300;">Nil</span></p>
	<p><br /><br /><br /></p>
	`,
    `
	<iframe src="https://www.townscript.com/widget/godfather-114110" frameborder="0" height="250" width="80%"></iframe>
	<p><strong><em>Description:</em></strong></p>
	<p><em><span style="font-weight: 400;">&ldquo;Great men are not born great, they grow great.&rdquo;- Don Vito Corleone</span></em></p>
	<p><em><span style="font-weight: 400;">&nbsp;E-Summit&rsquo;20 brings to you &lsquo;Godfather&rsquo;, an event like never before, the perfect event to test out your business instinct, knowledge and your street smarts.</span></em></p>
	<p><em><span style="font-weight: 400;">Whatever be the situation,always remember the golden rule-&ldquo;Never let anyone know what you&rsquo;re thinking.&rdquo;- Michael Corleone.</span></em></p>
	<p><em><span style="font-weight: 400;">Registrations opening soon!</span></em></p>
	<p>&nbsp;</p>
	<p><strong><em>Prize: </em></strong><em><span style="font-weight: 400;">TBA</span></em><em><span style="font-weight: 400;"><br /><br /></span></em></p>
	<p><strong><em>Team size:</em></strong><em><span style="font-weight: 400;"> 2-4</span></em></p>
	<p>&nbsp;</p>
	<p><strong><em>Registration Link: </em></strong><em><span style="font-weight: 400;">https://forms.gle/QaEMdHA5vHHBa4Ad9</span></em></p>
	<p>&nbsp;</p>
	<p><strong><em>Overview:</em></strong></p>
	<p><em><span style="font-weight: 400;">The aim is to establish yourself in the crime world by investing your funds on different goods and people of the to your interests and survive through the tough conditions. The best-devised strategy wins.</span></em></p>
	<p>&nbsp;</p>
	<p><strong><em>Tagline:</em></strong></p>
	<p><em><span style="font-weight: 400;">&ldquo;Never let anyone know what you are thinking.&rdquo;- Michael Corleone.</span></em></p>
	<p>&nbsp;</p>
	<p><strong><em>What is it about:</em></strong></p>
	<p><em><span style="font-weight: 400;">The event is about testing the business instinct,knowledge and street smarts of the participants by putting them under a crime world situation in which they need to showcase their skills in order to win and become the ultimate &lsquo;Godfather&rsquo; .</span></em></p>
	<p>&nbsp;</p>
	<p><strong><em>Rounds description</em></strong><em><span style="font-weight: 400;">&nbsp;</span></em></p>
	<p>&nbsp;</p>
	<p><strong>Round 1(Prelims)</strong></p>
	<p>&nbsp;</p>
	<ul>
	<li style="font-weight: 400;"><em><span style="font-weight: 400;">The prelims would be conducted on-campus in the form of a written quiz to test out the knowledge of the participants to check their aptitude,business knowledge and problem solving abilities.The top 6-8 teams would further qualify for the final and the most important round.</span></em></li>
	</ul>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p><strong>Round 2</strong></p>
	<p>&nbsp;</p>
	<ul>
	<li style="font-weight: 400;"><em><span style="font-weight: 400;">The game begins on the roll of a dice where each team tries to complete the entire game board with the purpose of having the maximum net worth at the end of the game. Participants need to increase and improve on their assets and rise as the Godfather by taking strategic decisions as per the different situations that are thrown onto them all throughout the journey .They need to take into consideration all the important aspects that include Legalities, Government Bodies, Costs, Return Value, Risk vs Reward etc.</span></em></li>
	</ul>
	<ul>
	<li style="font-weight: 400;"><span style="font-weight: 400;">In the initial stages, each team will get allocated to a certain profession of the crime world(each having a specified pay-cut).</span></li>
	</ul>
	<ul>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The game board has different kinds of tiles and the participants must act accordingly.Some of the tiles include&nbsp; &rsquo;PAY NOW&rsquo;, &rsquo;COLLECT NOW&rsquo;, &lsquo;CHECKPOINT&rsquo; etc. The game is not based on luck and the tables can be easily turned at any point if you have the right knowledge and skills.</span></li>
	</ul>
	<ul>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The game promotes cashless transactions(secret transactions to stay away from the government trying to track everyone).Each team will be given read-only access to a document which will show their current account balance and will be updated at every transaction made.</span></li>
	</ul>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<p><strong><em>Participation fees: </em></strong><em><span style="font-weight: 400;">NIL</span></em></p>
	<p><br /><br /><br /></p>
	`,
    `
	<iframe src="https://www.townscript.com/widget/wolf-of-wall-street-144114" frameborder="0" height="250" width="80%"></iframe>
	<p><strong>Description:</strong></p>
	<p><em><span style="font-weight: 400;">In life, you don&rsquo;t get what you deserve. You get what you negotiate.</span></em></p>
	<p><span style="font-weight: 400;">Our event aims to create a business simulation that tests these very negotiation skills. Complete with production and trading opportunities, the game will cultivate holistic thinking and decision making skills among the participants in a dynamic, competitive and fun environment. You need to optimally utilize the resources provided, trade goods with others gathering the scarce goods and maximize profit for yourself. The prices of the goods fluctuate with availability. Compete to win this battle of wits and take away the fortune!</span></p>
	<p><span style="font-weight: 400;">Prize: TBA</span></p>
	<p><span style="font-weight: 400;">Team size: 3</span></p>
	<p><span style="font-weight: 400;">RULES:</span></p>
	<p><strong><em>ROUND 1&nbsp;</em></strong></p>
	<ol>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Varied resources will be arranged and distributed randomly among the participating teams.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Virtual money will be equally distributed among the teams to buy more resources.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The teams must produce market goods within the stipulated time using these resources.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The quantity of goods to be produced will be decided by the teams. Their ultimate goal will be to maximize profit.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Teams are allowed to trade goods with one another to gather those which they think are scarce and would get them the most profits.&nbsp;</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The market prices will keep fluctuating based on total production of goods.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The ones with the highest valued portfolios will be declared the winners.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The top 5-7 teams will advance to the next round. All qualifying teams will receive gift coupons.</span></li>
	</ol>
	<p><strong><em>ROUND 2</em></strong></p>
	<ol>
	<li><span style="font-weight: 400;">Participants will receive a rumor sheet and a rule response sheet.</span></li>
	<li><span style="font-weight: 400;">The second round is all about investing your money in various companies and maximize your portfolio on the basis of rumors. There are two ways through which you get to make your profit. It's either buying shares or short-selling.</span></li>
	<li><span style="font-weight: 400;">Short Selling: This is a concept where an investor sells the share which he actually doesn&rsquo;t own. So, basically it is done when you expect a share price to fall. For example, if an investor thinks that Tesla (TSLA) stock is overvalued at $315 per share, and is going to drop in price, the investor may borrow 10 shares of TSLA from their broker and sells it for the current market price of $315. If the stock goes down to $300, the investor could buy the 10 shares back at this price, return the shares to her broker, and net a profit of $315 (selling price) - $300 (buying price) = $15 per share.</span></li>
	</ol>
	<p><span style="font-weight: 400;">3.1 Participants have to short sell at least 1 company share.</span></p>
	<p><span style="font-weight: 400;">3.2 Budget for short selling is 1,00,000 rupees.</span></p>
	<p><span style="font-weight: 400;">3.3 Participants can short sell maximum of rupees 50,000 in a single company.</span></p>
	<p>&nbsp;</p>
	<ol start="4">
	<li><span style="font-weight: 400;">Buying: You have rumors on the basis of which you&rsquo;ll have to invest (buy) in different companies.&nbsp;</span></li>
	</ol>
	<p><span style="font-weight: 400;">4.1.</span> <span style="font-weight: 400;">You have to invest in at least 3 companies</span></p>
	<p><span style="font-weight: 400;">4.2.</span> <span style="font-weight: 400;">The budget for buying is Rs. 2,50,000 (total).</span></p>
	<p><span style="font-weight: 400;">4.3.</span> <span style="font-weight: 400;">The maximum amount that you can invest(buy)in a single company is Rs. &nbsp; 1,00,000.</span></p>
	<p>&nbsp;</p>
	<ol start="5">
	<li><span style="font-weight: 400;">Use of simple calculators is allowed.</span></li>
	<li><span style="font-weight: 400;">If your investment exceeds the budget or you are not able to abide by the previous mentioned rules, you will be directly DISQUALIFIED.</span></li>
	<li><span style="font-weight: 400;">Enter only the quantity in the space given in the response sheet that you want to buy/short-sell.</span></li>
	<li><span style="font-weight: 400;">You can buy shares in whole numbers only. No decimals are allowed for quantity. For eg. Buying of 55.5 shares is not allowed, it has to be either 55 or 56.</span></li>
	</ol>
	<p><br /><br /><br /></p>
	`,
    `
	<iframe src="https://www.townscript.com/widget/stock-pitch-024320" frameborder="0" height="250" width="80%">
	<p><span style="font-weight: 400;">Overview:</span><span style="font-weight: 400;">Acceptance and shunning of risk at the same time ; one investment or diversification ; pursuit of&nbsp; numbers; aversion of red flags : Dive into the world of stocks where the elixir of wealth flows without slope towards the patient.</span></p>
	<p><span style="font-weight: 400;">&ldquo;Many people get interested in stocks when everyone else is.The time to get interested is when no one else is.You can&rsquo;t buy what is popular and do well.&rdquo;:Warren Buffett.</span><span style="font-weight: 400;"><br /><br /></span></p>
	<p><span style="font-weight: 400;">Tagline</span><span style="font-weight: 400;">:Playing safe is not an option.:Garvita</span></p>
	<p><span style="font-weight: 400;">Along with the rounds a workshop will be held on the day to get people started on what this will be more about.</span></p>
	<p><span style="font-weight: 400;">&ldquo;In stocks as in romance,ease of divorce is not a sound basis for commitment.&rdquo;:Peter Lynch.</span><span style="font-weight: 400;"><br /><br /></span></p>
	<p><span style="font-weight: 400;">Rounds </span><span style="font-weight: 400;">:</span></p>
	<p><span style="font-weight: 400;">Depending on the no.&nbsp; that turnup on the day.</span></p>
	<p><span style="font-weight: 400;">Round 1(Filtration)</span><span style="font-weight: 400;">:</span></p>
	<p><span style="font-weight: 400;">A stock&nbsp; , which is common, is given to all along with information about that stock and all the related details that could possibly influence the stock prices.The stock may be real or we might have made up in which case all relevant details will point to a particular path and alongside closeness to the answer will also determine the selection.In case a real stock is selected then to ensure a fair trial</span></p>
	<p><span style="font-weight: 400;">the stock would not be so commonly known or stocks which made it to the news would be avoided.</span></p>
	<p><span style="font-weight: 400;">Round 2(Event)</span><span style="font-weight: 400;">:</span></p>
	<p><span style="font-weight: 400;">Stocks from various different areas or a choice within a particular group will be given from whereon selection is to be made by the participants, who are free to use the net and are supposed to promote rather convince the judges why they should buy their stocks.</span></p>
	<p><span style="font-weight: 400;">The best will be decided based on the real time analysis and the data provided by the participants.</span><span style="font-weight: 400;"><br /><br /></span></p>
	<p><span style="font-weight: 400;">Team size</span><span style="font-weight: 400;">:2-3.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Rules</span><span style="font-weight: 400;"> :</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">1. Time Limit : 5-6 minutes</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">2. No outside help will be allowed from anyone (no phone calls, emails, etc.)</span></p>
	<ol start="3">
	<li><span style="font-weight: 400;">All data sources are fair game, including the Internet and any proprietary quantitative or fundamental models developed in advance. However, proper attribution must be provided (i.e., sources must be clearly marked on each slide).</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">4. The decision of the organising team will be final and binding.</span></li>
	</ol>
	<p><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;">Participation fees</span><span style="font-weight: 400;">:Nil.</span></p>
	<p><br /><br /><br /></p>
	`,
    `
	<iframe src="https://www.townscript.com/widget/stock-market-simulation-042141" frameborder="0" height="250" width="80%"></iframe>
	<p><span style="font-weight: 400;">Tagline</span><span style="font-weight: 400;">:-</span></p>
	<p><span style="font-weight: 400;">Press your brakes and hold your stakes.</span></p>
	<p><span style="font-weight: 400;">Wise or noobs, it's your time to choose.</span></p>
	<p><span style="font-weight: 400;">Invest your lakhs, earn your crores.</span></p>
	<p><span style="font-weight: 400;">Coz that's how you get your prizes and scores!</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Team Size </span><span style="font-weight: 400;">:- Individual</span></p>
	<p><span style="font-weight: 400;">Prize </span><span style="font-weight: 400;">:- TBA</span></p>
	<p><span style="font-weight: 400;">Participation Fee :- </span><span style="font-weight: 400;">&nbsp;Nil</span></p>
	<p><span style="font-weight: 400;">Overview</span><span style="font-weight: 400;"> :-&nbsp;</span></p>
	<p><span style="font-weight: 400;">How the event would function</span></p>
	<p><span style="font-weight: 400;">This event is first of it's kind in IIITD like the E-Summit. It will be organised on an Online Stock Simulation Platform which provides you some virtual money and the same can be used for investing in Stock Market. The market will be simulated as per the real time market.&nbsp;</span></p>
	<p><span style="font-weight: 400;">Not many of us are familiar with stock marketing. So, we have a short seminar on the basics of Stock Marketing.</span></p>
	<p><span style="font-weight: 400;">This event is splitted in two rounds of 2 hours each. After the first round, the top 30 participants according to the leaderboard will be announced. And they will enter in the second round of intense battle of stock marketing. The two rounds have a gap of 1 hour between them. At the end of the second round, the winners will be announced.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Disqualification:</span></p>
	<p><span style="font-weight: 400;">Using any other web-app services(like WhatsApp, Facebook, Google) is not allowed. The Internet can't be used for taking any help. The Internet is permitted only for the use of our platform.</span></p>
	<p><span style="font-weight: 400;">In case of any dispute, the decision of organisers will be final &amp; binding.</span></p>
	<p><br /><br /><br /></p>
	`,
    `
	<iframe src="https://www.townscript.com/widget/pitch-cafe-30-143004" frameborder="0" height="250" width="80%"></iframe>
	<p><span style="font-weight: 400;">Event Description:</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Participation fees - Free</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Between ideas and reality lies a small pitch.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Pitch Cafe fosters the spirit of entrepreneurship amongst young innovators, budding startups and brings them closer to fulfilling their dreams. It provides an excellent platform for potential ideas and early-stage startups to be recognised by the industry.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Structure:&nbsp;</span></p>
	<ol>
	<li><span style="font-weight: 400;"> Group event</span></li>
	<li><span style="font-weight: 400;"> Team Size: 1-4</span></li>
	<li><span style="font-weight: 400;"> Three rounds</span></li>
	</ol>
	<p><span style="font-weight: 400;">&nbsp;</span></p>
	<p><strong>Rounds:</strong></p>
	<p><span style="font-weight: 400;">The event will take place in three rounds:</span></p>
	<p>&nbsp;</p>
	<h3><strong>1.Idea Screening</strong></h3>
	<p><span style="font-weight: 400;">&nbsp;In this round, all the teams have to submit an abstract of their idea which will be evaluated by our esteemed judges based on:</span></p>
	<p>&nbsp;</p>
	<ul>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The innovation in your idea</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The real-world problem it mitigates</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The market opportunity for the idea</span></li>
	</ul>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">The teams with the ideas which qualify the minimum eligibility criteria would be allowed to progress to the next round.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Teams would be participating in three categories:</span></p>
	<p>&nbsp;</p>
	<ul>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Social Entrepreneurship</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Registered Startup</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Startups in the ideation phase,with products in prototype phase</span></li>
	</ul>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">18 FEB'20 - 10 MAR'20</span></p>
	<p><br /><br /></p>
	<h3><strong>2. Pitching Round 1</strong></h3>
	<p><span style="font-weight: 400;">Top 40 teams that clear the 1st round will be invited to present their startup at E-Summit. Each team would be given the opportunity to pitch their ideas before a panel of judges. Each pitch would be 5 mins long and would be succeeded by a Q&amp;A session with the judges.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">21 MAR'20 - 21 MAR'20</span></p>
	<p>&nbsp;</p>
	<h3><strong>3. Pitching Round 2</strong></h3>
	<p><span style="font-weight: 400;">Top 5 teams that clear the 2nd round will be given an opportunity to pitch their startup before a panel of venture capitalists in a closed room. </span><span style="font-weight: 400;">Each pitch would be 10 mins long and would include a Q&amp;A session with the judges.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">22 MAR'20 - 22 MAR'20</span></p>
	<p><br /><br /></p>
	<h3><strong>RULES &amp; REGULATIONS</strong></h3>
	<ol>
	<li style="font-weight: 400;"><span style="font-weight: 400;">Each startup may consist of a maximum of four members, who will be present their startup on the stall.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The decision of the judges shall be final and binding, though in all the rounds.</span></li>
	<li style="font-weight: 400;"><span style="font-weight: 400;">The startups that will be joining us on the day of the event are expected to bring their own promotional posters and standees.</span></li>
	</ol>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">For more updates, join our Telegram channel- https://d2c.pw/8shIZ</span></p>
	<p><br /><br /></p>
	`,
    '<br><br>More details coming soon.<br>Stay tuned!',
    `<iframe src="https://www.townscript.com/widget/ipl-simulation-102104" frameborder="0" height="250" width="80%"></iframe>
	<p><strong>Description:&nbsp;</strong></p>
	<p><span style="font-weight: 400;">E-Summit 2020 brings to you IPL Auction, an exciting combination of entrepreneurship and cricket which consists of 2 rounds. The motivation is to test the art of using limited resources for getting the best possible results. After all, &ldquo;Doing More with Less&rdquo; is just what the world demands today!. Demanding lesser cricketing knowledge, it is based more on </span><span style="font-weight: 400;">encouraging participants to make wise choices, taking calculated risks, keeping the future prospects in mind.</span></p>
	<p>&nbsp;</p>
	<p><strong>Prize:</strong><span style="font-weight: 400;"> TBA</span></p>
	<p>&nbsp;</p>
	<p><strong>Team size</strong><span style="font-weight: 400;">: 3-4</span></p>
	<p>&nbsp;</p>
	<p><strong>Tagline</strong><span style="font-weight: 400;">-</span><strong> "</strong><em><span style="font-weight: 400;">Invest in the best</span></em><strong>"</strong></p>
	<p>&nbsp;</p>
	<p><strong>Rounds Description:</strong></p>
	<p><span style="font-weight: 400;">There will be two rounds in the event.</span></p>
	<p>&nbsp;</p>
	<p><strong>Round 1</strong><span style="font-weight: 400;">:&nbsp;</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Consists of 2 sub-rounds.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">1) A pool of 100 women cricketers would be assigned to the teams. The pool would be sorted according to the roles. Given a situation (or the requirements needed in a playing 11), every team has to come up with a Dream 11 combination. Points will be awarded based on the number of requirements fulfilled. Participants may be given the option of referring to the stats of a player. Time Limit: 5-7 minutes</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">2) MCQs related to entrepreneurship on IPL. (Not related to making teams as such) examples, total budget, about sponsors of IPL seasons, venue prices, budget in organizing a match or matches, changes in ticket pricing according to the teams playing, advertising strategies used, etc.</span></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">Top 8 Teams will be selected for the next round.</span></p>
	<p>&nbsp;</p>
	<p><strong>Round 2:</strong></p>
	<p>&nbsp;</p>
	<p><span style="font-weight: 400;">1) 8 teams will contest the auction.</span></p>
	<p><span style="font-weight: 400;">2) Player pool of approx 120 players, each player having a rating of 1-5.</span></p>
	<p><span style="font-weight: 400;">3) The teams will be given a review of the pool prior to the start of auction since the focus of the event is taking calculated risks rather than a great amount of cricketing knowledge.</span></p>
	<p><span style="font-weight: 400;">4) The rating of a player will be again disclosed before the bid begins.</span></p>
	<p><span style="font-weight: 400;">5) A team has to buy exactly 11 players, including 3-5 batsmen, 3-5 bowlers, 1 wicket-keeper, 1-3 all-rounders. In the end, there must be at least 5 bowling options with the team.</span></p>
	<p><span style="font-weight: 400;">6) Starting budget: 100 Crores</span></p>
	<p><span style="font-weight: 400;">7) Each player will have a maintenance cost (varying from 1-5) which will be totally based on how much a player is prone to injuries. Participants can even surf and check the injury records if they wish to get a fair idea of the maintenance cost of a player. The motive is to imbibe the skill of keeping future prospects in mind. The maintenance cost will be disclosed after the bid only.</span></p>
	<p><span style="font-weight: 400;">8) The number of players of the same national team will contribute to a greater number of rating points. Let&rsquo;s say there are n players of the same national team, participants will be awarded n extra rating points. So, what to do? Going for lesser rated players of the same team or higher rated players of another team? Yes, it&rsquo;s tough.</span></p>
	<p><span style="font-weight: 400;">8) Participants have to make wise choices to make a team with maximum possible rating points by keeping all the constraints in check.</span></p>
	<p><br /><br /></p>
	<p><strong>Participating fee:</strong><span style="font-weight: 400;"> Nil</span></p>
	<p><br /><br /><br /></p>
	`,
    '<br><br>More details coming soon.<br>Stay tuned!',
];

$(document).ready(function() {

    origTop = $("h1").css('top');
    origTop = Number(origTop.substr(0, origTop.length - 2));
    origLh = $("h1").css('line-height');
    origLh = Number(origLh.substr(0, origLh.length - 2));


    $('h1').css({
        'top': (origTop - 80) + 'px',
        'line-height': (origLh - 60) + 'px'
    });

    $('.sub-head').css({
        'top': (origTop - 60) + 'px'
    });

    $('body').css('overflow', 'hidden');


    $(window).resize(function() {
        waves.setSize();
        stars.setSize();
    });

    $('.page-2-event').click(function() {
        events.open($(this));
    });

    $('#event-close').click(function() {
        events.close();
    });


    $('.menu-item').click(function() {
        let i = $(this).attr('id').substr(10);
        $('html, body').animate({
            'scrollTop': $('#page-' + i).offset().top
        }, 1200);
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27 && events.status) {
            events.close();
        }
    });

    $('#event-dis').click(function(e) {
        if ($(e.target).attr('id') == 'event-dis') {
            events.close();
        }
    });

});

$(window).on('load', function() {

    waves.init();
    stars.init();
    events.init();

    function anim() {
        waves.update();
        stars.update();
        requestAnimationFrame(anim);
    }
    window.requestAnimationFrame(anim);

    $("#load-cont").velocity({
        'opacity': '0'
    }, {
        duration: 600,
        easing: 'easeInQuad',
        complete: function() {
            $(this).remove();
            $('body').css('overflow', 'initial');
            $('h1').velocity({
                'top': (origTop) + 'px',
                'line-height': (origLh) + 'px',
                'opacity': '1'
            }, {
                duration: 1600,
                easing: 'easeOutExpo'
            });

            $('.sub-head').velocity({
                'top': (origTop) + 'px',
                'opacity': '1'
            }, {
                duration: 1600,
                easing: 'easeOutExpo'
            });

            $('#header-logo').velocity({
                'opacity': '1'
            }, {
                duration: 600,
                easing: 'easeInQuad',
                delay: 1150
            });
            for (let i = 1; i <= $('.menu-item').length; i++) {
                let x = i;
                if (x > 2) {
                    x++;
                }
                $('#menu-item-' + x).velocity({
                    'opacity': '1'
                }, {
                    duration: 720,
                    easing: 'easeInQuad',
                    delay: (i - 1) * 230,
                });
            }
        }
    });


});

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});