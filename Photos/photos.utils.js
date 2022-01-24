export const returnHashTags = (caption) => {
    const parsed = caption.match(/#[\w]+/g) || []; 
    return parsed.map(hashtag => ({
        where: { hashtag },
        create: { hashtag },
      }));
}