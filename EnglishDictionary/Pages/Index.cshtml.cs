using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using WeCantSpell.Hunspell;

namespace EnglishDictionary.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
        public IActionResult OnGetSuggestion(string word)
        {
            var dictionary = WordList.CreateFromFiles(@"english.dic");
            var suggestions = dictionary.Suggest(word);
            return new JsonResult(suggestions);
        }
    }
}