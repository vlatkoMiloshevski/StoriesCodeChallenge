
using StoriesCodeChallenge.Interfaces;

namespace StoriesCodeChallenge.Services
{
    public class StoryService : IStoryService
    {

        private static HttpClient httpClient = new HttpClient();

        public StoryService()
        {

        }

        public async Task<HttpResponseMessage> GetStoriesAsync()
        {
            return await httpClient.GetAsync("https://hacker-news.firebaseio.com/v0/newstories.json");
        }

        public async Task<HttpResponseMessage> GetStoryAsync(int id)
        {
            return await httpClient.GetAsync(string.Format("https://hacker-news.firebaseio.com/v0/item/{0}.json", id));
        }
    }
}