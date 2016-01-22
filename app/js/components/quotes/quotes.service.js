function QuotesService() {
  var quotes = [
    '“Make your work in keeping with your purpose.” - Leonardo Da Vinci',
    '“When we quit thinking primarily about ourselves, we undergo a truly heroic transformation.” - Joseph Campbell',
    '“You must be the change you wish to see in the world.” - Mohandas Gandhi',
    '“A person starts to live when he can live outside of himself.” - Albert Einstein',
    '“Seek above all for a game worth playing . . .” - Robert de Ropp',
    '“When you cease to make a contribution, you begin to die.” - Eleanor Roosevelt',
    '“We are what we repeatedly do.” - Aristotle',
    '‘The really great make you feel that you, too, can become great.’ - Mark Twain',
    '“There are really only two ways to approach life, as a victim or as a gallant fighter” - Merle Shain',
    '“My strength lies solely in my tenacity.” - Louis Pasteur',
    '“No matter where you go, there you are.” - Buckaroo Banzai',
    '“Your imagination is your preview of life’s coming attractions.” - Albert Einstein',
    '“The best way to find yourself is to lose yourself in the service of others.” - Mahatma Gandhi',
    '“The ego is not your amigo.” - Dr. Michael Pritchard',
    '“To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.” - Ralph Waldo Emerson',
    '“Great things are done by a series of small things brought together.” - Vincent Van Gogh',
    '“A man is great by deeds, not by birth.” - Chanakya',
    '“We make a living by what we get, but we make a life by what we give.” - Winston Churchill',
    '“We cannot teach people anything. We can only help them discover it within themselves.” - Galileo Galilei',
    '“Celebrate what you want to see more of.” - Thomas J. Peters',
    '“It is health that is real wealth and not pieces of gold and silver.” - Mahatma Gandhi',
    '“It is neither wealth nor splendor; but tranquility and occupation which bring happiness.” - Thomas Jefferson',
    '“The only way to discover the limits of the possible is to go beyond them into the impossible.” - Arthur C. Clarke',
    '“We will either find a way or make one.” - Hannibal',
    '“What saves a man is to take a step.” - Antoine de Saint-Exupéry  ',
    '“Every wrong attempt discarded is another step forward.” - Thomas Edison',
    '“When the sun rises, I go to work. When the sun goes down, I take my rest. Kings can do no more.” - From China 2,500 B.C.',
    '“A happy life is one which is in accord with its own nature.” - Seneca',
    '“The best way to predict the future is to create it” - Peter Drucker',
    '“Courage is not the absence of fear, but rather the judgment that something else is more important than fear.” - Ambrose Redmoon',
    '“The secret of success is making your vocation your vacation.” - Mark Twain',
    '‘The question: “Who ought to be boss?” is like asking, “Who ought to be the tenor in the quartet?” It is the person who can sing tenor.’ - Henry Ford',
    '“Life is a daring adventure” - Helen Keller',
    '“Travel as much as you can, and don’t take yourself too seriously” - Aunt Helen',
    '“Knowledge is knowing a tomato is a fruit; wisdom is not putting it in a fruit salad.” - Miles Kington',
    '“I love deadlines. I like the whooshing sound they make as they fly by.” - Douglas Adams',
    '“A bargain is something you don’t need at a price you can’t resist.” - Franklin Jones',
    '“Some cause happiness wherever they go; others, whenever they go.” - Oscar Wilde',
    'How do you make others feel?',
    '“I intend to live forever. So far, so good.” - Steven Wright',
    '“Expectations are everything. Keep them sufficiently high.” - Aunt Helen'
  ];

  return {
    getQuote: function() {
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
  };
}

module.exports = QuotesService;
