window.Seed = (function () {
  function generateVoteCount() {
    return Math.floor((Math.random() * 30) + 5);
  }

  const albums = [
    {
      id: 1,
      title: 'Villains',
      description: 'The album has been described as "a little looser and more uptempo than their last release ...Like Clockwork and "more carefree". Josh Homme cites his interest in dancing, working with Mark Ronson, and the song, "Uptown Funk" for the direction of the album.',
      url: '#',
      votes: generateVoteCount(),
      productImageUrl: 'images/1.png',
    },
    {
      id: 2,
      title: 'Songs for the Deaf',
      description: 'Songs for the Deaf is loosely considered a concept album, taking the listener on a drive through the California desert from Los Angeles to Joshua Tree while tuning into radio stations from towns along the way, such as Banning and Chino Hills.',
      url: '#',
      votes: generateVoteCount(),
      productImageUrl: 'images/2.png',
    },
    {
      id: 3,
      title: 'Era Vulgaris',
      description: 'The albums title Era Vulgaris refers to the Latin term for Common Era. The title was chosen by Homme because he thought "it sounds like the Vulgar Era, which I like, because that sounds like something that I would like to be part of… I mean I think were in it, and Im stoked" ',
      url: '#',
      votes: generateVoteCount(),
      productImageUrl: 'images/3.jpg',
    },
    {
      id: 4,
      title: 'Lullabies to Paralyze',
      description: 'And at the time, I was like, "Fuck, no ones even listening to this. Its too much about other stuff." And it would have been easy to make Songs for the Deaf 2, which is basically all I heard in my own head. But I cant do that. Youve got to shake all that shit away',
      url: '#',
      votes: generateVoteCount(),
      productImageUrl: 'images/4.jpg',
    },
  ];

  return { albums: albums };
}());
