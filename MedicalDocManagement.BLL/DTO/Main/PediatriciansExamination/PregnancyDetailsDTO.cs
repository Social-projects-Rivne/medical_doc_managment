namespace MedicalDocManagement.BLL.DTO.Main.PediatriciansExamination
{
    public struct PregnancyDetailsDTO
    {
        public string SomeDetails { get; set; }
        public bool? PassedNormally { get; set; }
        public bool? PassedWithToxemia { get; set; }
        public string ToxemiaDetails { get; set; }
        public bool? PassedWithAnemia { get; set; }
        public bool? WithThreatInInterruption { get; set; }
        public string DateOfInterruption { get; set; }
        public string FromDetails { get; set; }
        public int ChildBirth { get; set; }
    }
}