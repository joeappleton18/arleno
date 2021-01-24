import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Schedule = () => (
  <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="left">Week</TableCell>
          <TableCell align="left">Focus</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
        <TableCell align="center" colSpan={4}> <strong> 1) Introducing Research </strong> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">1</TableCell>
          <TableCell align="left">
            Introduction to Research Methods
           
          </TableCell>
          <TableCell align="left">
    
            It all starts here! The idea goal of this unit is not to turn you all into researchers - although, that would be a nice bonus. This week I will introduce you to this unit, and how it feeds into your final year project. Further to this, we consider what scientific research is. 
  
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">2</TableCell>
          <TableCell align="left">
            What makes a good project?
          </TableCell>
          <TableCell align="left">
          This week we explore how you can maximize your potential, and get the best possible mark in your final year project.
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="left">3</TableCell>
          <TableCell align="left">
           Framing Your Research
          </TableCell>
          <TableCell align="left">
          This is a very exciting week as we will now begin the process of traveling long path towards completing your final year project. The goal of this session is to orientate you with the idea of a research question or hypothesis.
          </TableCell>
        </TableRow>
       <TableRow>
       <TableCell align="center" colSpan={4}> <strong> 2) Reading and Referencing </strong> </TableCell>
       </TableRow>
       <TableRow>
       <TableCell align="left">
            4
          </TableCell>
       <TableCell align="left">
            Searching for Literature
          </TableCell>
          <TableCell align="left">
          This week we explore how to search for the literature in an objective way. 
          </TableCell>
        </TableRow>
        <TableRow>
       <TableCell align="left">
            5
          </TableCell>
       <TableCell align="left">
            Referencing and academic integrity
          </TableCell>
          <TableCell align="left">
          This week we explore how you can avoid a trip to the academic misconduct panel. More importantly, you'll gain an appreciation of how you can use external source to underpin strong arguments. 
          </TableCell>
        </TableRow>
        <TableRow>
       <TableCell align="left">
            6
          </TableCell>
       <TableCell align="left">
            Critically Analysing Sources
          </TableCell>
          <TableCell align="left">
          In higher education terms as critical thinking or critical analysis are thrown around with disregard; but, what do they really mean? This week we will try and define these terms and then use these ideas analyse some academic sources.
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="center" colSpan={4}> <strong> 3) Writing and Communication </strong> </TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="left">
              7
            </TableCell>
          <TableCell align="left">
              Writing Clearly and Communicating with Authority
            </TableCell>
            <TableCell align="left">
            Did you know there are different genres of writing (e.g., academic, blogging, journalistic, business formal). The genre you use depends on your audience; for instance, these notes are fairly informal to connect with my student audience. This week we are going to be exploring the more formal, academic style, of writing.  You'll learn how to construct the prefect paragraph and grammar rules for clear and formal writing. You'll learn the clarity is key!
            </TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="left">
              8
            </TableCell>
          <TableCell align="left">
              Proof Reading, Editing and Restructuring 
            </TableCell>
            <TableCell align="left">
             Hemingway famously said, "The first draft of anything is s**t.". Yet, many students hand in the first draft. This is not only painful to read, but also prevents you from fulfilling your potential.  This week we look at some tips and tricks that can hugely improve the quality of your writing. A little bit goes a long way here, so I hoping to see a marked improvement in you reports. 
            </TableCell>
           
        </TableRow>
        <TableRow>
        <TableCell align="center" colSpan={4}> <strong> 4) Conducting Research </strong> </TableCell>
     
        </TableRow>
        <TableRow>
          <TableCell align="left">
                9
              </TableCell>
            <TableCell align="left">
              What are Methods
              </TableCell>
              <TableCell align="left">
              Methods will make up one of the most important sections of your final year project, they ensure the repeatability of your work, showing that you took a systematic approach. Methods are important tools that you need to be able to exploit to conduct and evaluate your final year project.
              </TableCell> 
         </TableRow>
         <TableRow>
          <TableCell align="left">
                10
              </TableCell>
            <TableCell align="left">
              Qualitative Methods
              </TableCell>
              <TableCell align="left">
              Most students tend to use qualitative methods (text and the spoken word) to evaluate their application  and UX projects(e.g., focus groups, interviews). This week we will look at techniques to evaluate this type of data. 
              </TableCell> 
         </TableRow>
         <TableRow>
          <TableCell align="left">
                11
              </TableCell>
            <TableCell align="left">
              Quantitative Methods
              </TableCell>
              <TableCell align="left">
               This week we scratch the surface of how to analyse qualitative (numerical) data. Many students take a qualitative approach to analysing their final year projects. However, often they do this in a somewhat blind fashion, gathering data for the sake of it.
              </TableCell> 
         </TableRow>
         <TableRow>
          <TableCell align="left">
                12
              </TableCell>
            <TableCell align="left">
              Assessment Support
              </TableCell>
              <TableCell align="left">
               The main assessment is due at the end of this week, so this session dedicated to support.
              </TableCell> 
         </TableRow>
      </TableBody>
      
    </Table>
  </TableContainer>
);

export { Schedule };
