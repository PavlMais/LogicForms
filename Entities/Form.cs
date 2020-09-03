using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogicForms
{
    public class Form
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int OwnerId { get; set; }
        public bool IsOpen { get; set; }
        public string QuestionsData { get; set; }

        public User Owner { get; set; }
    }
}
