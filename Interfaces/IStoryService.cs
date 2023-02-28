namespace StoriesCodeChallenge.Interfaces
{
    public interface IStoryService
    {
        Task<HttpResponseMessage> GetStoriesAsync();
        Task<HttpResponseMessage> GetStoryAsync(int id);
    }
}