using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using StoriesCodeChallenge.Interfaces;
using StoriesCodeChallenge.Model;

namespace StoriesCodeChallenge.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoryController : ControllerBase
    {
        private readonly IStoryService _storyService;

        private IMemoryCache _memoryCache;

        public StoryController(IStoryService storyService, IMemoryCache memoryCache)
        {
            this._storyService = storyService;
            this._memoryCache = memoryCache;
        }

        public async Task<List<Story>> Get(string? searchTerm)
        {
            List<Story> stories = new List<Story>();

            var response = await _storyService.GetStoriesAsync();
            if (response.IsSuccessStatusCode)
            {
                var storiesResponse = response.Content.ReadAsStringAsync().Result;
                var newestStoriesIds = JsonConvert.DeserializeObject<List<int>>(storiesResponse);

                var tasks = newestStoriesIds.Select(GetNewStoryAsync);
                stories = (await Task.WhenAll(tasks)).ToList();

                if (!String.IsNullOrEmpty(searchTerm))
                {
                    var search = searchTerm.ToLower();
                    stories = stories.Where(s => s.Title != null && s.Title.ToLower().IndexOf(search) > -1).ToList();
                }
            }
            return stories;
        }

        private async Task<Story> GetNewStoryAsync(int id)
        {
            return await _memoryCache.GetOrCreateAsync<Story>(id,
                async cacheEntry =>
                {
                    Story story = new Story();

                    var response = await _storyService.GetStoryAsync(id);
                    if (response.IsSuccessStatusCode)
                    {
                        var storyResponse = await response.Content.ReadAsStringAsync();
                        story = JsonConvert.DeserializeObject<Story>(storyResponse);
                        if (story == null) {
                            cacheEntry.Dispose();
                        }
                    }

                    return story;
                });
        }
    }
}