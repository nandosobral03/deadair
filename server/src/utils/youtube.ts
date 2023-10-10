import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
const categoryData: string = `
2 - Autos & Vehicles
1 - Film & Animation
10 - Music
15 - Pets & Animals
17 - Sports
18 - Short Movies
19 - Travel & Events
20 - Gaming
21 - Videoblogging
22 - People & Blogs
23 - Comedy
24 - Entertainment
25 - News & Politics
26 - Howto & Style
27 - Education
28 - Science & Technology
29 - Nonprofits & Activism
30 - Movies
31 - Anime/Animation
32 - Action/Adventure
33 - Classics
34 - Comedy
35 - Documentary
36 - Drama
37 - Family
38 - Foreign
39 - Horror
40 - Sci-Fi/Fantasy
41 - Thriller
42 - Shorts
43 - Shows
44 - Trailers
2 - Cars & Vehicles
23 - Comedy
27 - Education
24 - Entertainment
1 - Film & Animation
20 - Gaming
26 - How-to & Style
10 - Music
25 - News & Politics
29 - Non-profits & Activism
22 - People & Blogs
15 - Pets & Animals
28 - Science & Technology
17 - Sport
19 - Travel & Events
`;

// Split the data by newline and create the Map
const categoryMap = new Map<string, string>(
    categoryData
        .trim()
        .split('\n')
        .map((line) => {
            const [id, name] = line.split(' - ');
            return [id.trim(), name.trim()];
        })
);


const apiKey = process.env.YOUTUBE_API_KEY;

export const YoutubeAPI = google.youtube({
    version: 'v3',
    auth: apiKey,
});



export const durationToSeconds = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) {
        return 0;
    }
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
}

export const getCategoryName = (id: string) => {
    return categoryMap.get(id.trim());
}

export const getPlaylistItems = async (playlistId: string) => {
    const playlistItems = await YoutubeAPI.playlistItems.list({ playlistId: playlistId, part: ['contentDetails'], maxResults: 50 });
    return playlistItems.data.items?.map((item) => item.contentDetails?.videoId) as string[];


}