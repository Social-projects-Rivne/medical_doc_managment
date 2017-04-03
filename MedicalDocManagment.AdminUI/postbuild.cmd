@echo off
(robocopy "%1app" "%1..\MedicalDocManagment.SharedUI\app" /E /XO /NFL /NDL /NJH /NJS /nc /ns)
(robocopy "%1dist" "%1..\MedicalDocManagment.SharedUI\dist" /E /XO /NFL /NDL /NJH /NJS /nc /ns)
@echo on
exit 0