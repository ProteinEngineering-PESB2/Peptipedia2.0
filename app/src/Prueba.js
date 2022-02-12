import { useEffect } from 'react'

import blasterjs from 'biojs-vis-blasterjs'

let alignments = `
BLASTP 2.8.1+


Reference: Stephen F. Altschul, Thomas L. Madden, Alejandro A.
Schaffer, Jinghui Zhang, Zheng Zhang, Webb Miller, and David J.
Lipman (1997), "Gapped BLAST and PSI-BLAST: a new generation of
protein database search programs", Nucleic Acids Res. 25:3389-3402.


Reference for composition-based statistics: Alejandro A. Schaffer,
L. Aravind, Thomas L. Madden, Sergei Shavirin, John L. Spouge, Yuri
I. Wolf, Eugene V. Koonin, and Stephen F. Altschul (2001),
"Improving the accuracy of PSI-BLAST protein database searches with
composition-based statistics and other refinements", Nucleic Acids
Res. 29:2994-3005.



Database: Non-redundant UniProtKB/SwissProt sequences
           478,091 sequences; 181,270,864 total letters



Query= sp|P40337|VHL_HUMAN von Hippel-Lindau disease tumor suppressor
OS=Homo sapiens OX=9606 GN=VHL PE=1 SV=2

Length=213
                                                                      Score     E
Sequences producing significant alignments:                          (Bits)  Value

P40337.2  RecName: Full=von Hippel-Lindau disease tumor suppresso...  431     2e-155
Q5Q9Z2.1  RecName: Full=von Hippel-Lindau disease tumor suppresso...  353     1e-124
Q64259.1  RecName: Full=von Hippel-Lindau disease tumor suppresso...  318     4e-111
P40338.1  RecName: Full=von Hippel-Lindau disease tumor suppresso...  308     3e-107
Q6RSH7.1  RecName: Full=von Hippel-Lindau-like protein; Short=VHL...  157     2e-48 
Q9V3C1.1  RecName: Full=Protein Vhl [Drosophila melanogaster]         41.6    0.001 
Q19213.1  RecName: Full=von Hippel-Lindau tumor suppressor homolo...  39.7    0.005 
P12348.3  RecName: Full=Period circadian protein [Drosophila pseu...  39.7    0.015 
Q12019.1  RecName: Full=Midasin; AltName: Full=Dynein-related AAA...  34.7    0.67  
O43493.4  RecName: Full=Trans-Golgi network integral membrane pro...  33.5    1.1   
Q6NU09.1  RecName: Full=Volume-regulated anion channel subunit LR...  32.3    3.2   
P41002.2  RecName: Full=Cyclin-F; AltName: Full=F-box only protei...  31.6    5.8   
Q64398.1  RecName: Full=Diacylglycerol kinase eta; Short=DAG kina...  31.6    5.9   


>P40337.2 RecName: Full=von Hippel-Lindau disease tumor suppressor; AltName: 
Full=Protein G7; AltName: Full=pVHL [Homo sapiens]
Length=213

 Score = 431 bits (1108),  Expect = 2e-155, Method: Compositional matrix adjust.
 Identities = 213/213 (100%), Positives = 213/213 (100%), Gaps = 0/213 (0%)

Query  1    MPRRAENWDEAEVGAEEAGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPR  60
            MPRRAENWDEAEVGAEEAGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPR
Sbjct  1    MPRRAENWDEAEVGAEEAGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPR  60

Query  61   PVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR  120
            PVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR
Sbjct  61   PVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR  120

Query  121  DAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDI  180
            DAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDI
Sbjct  121  DAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDI  180

Query  181  VRSLYEDLEDHPNVQKDLERLTQERIAHQRMGD  213
            VRSLYEDLEDHPNVQKDLERLTQERIAHQRMGD
Sbjct  181  VRSLYEDLEDHPNVQKDLERLTQERIAHQRMGD  213


>Q5Q9Z2.1 RecName: Full=von Hippel-Lindau disease tumor suppressor; AltName: 
Full=pVHL [Canis lupus familiaris]
Length=219

 Score = 353 bits (907),  Expect = 1e-124, Method: Compositional matrix adjust.
 Identities = 189/211 (90%), Positives = 196/211 (93%), Gaps = 0/211 (0%)

Query  1    MPRRAENWDEAEVGAEEAGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPR  60
            MPR+A + +EAE GAEE G EE GPEE GGEESGAEESGPEES PEE GA  EMEAG+PR
Sbjct  1    MPRKAGSVEEAEAGAEEVGAEEVGPEESGGEESGAEESGPEESDPEEPGAAAEMEAGQPR  60

Query  61   PVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR  120
            PVLRSVNS EPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR
Sbjct  61   PVLRSVNSCEPSQVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFR  120

Query  121  DAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDI  180
            DAGT+DGLLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDI
Sbjct  121  DAGTYDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDI  180

Query  181  VRSLYEDLEDHPNVQKDLERLTQERIAHQRM  211
            VRSLYEDLEDHPNV+KDLERL QE I +QRM
Sbjct  181  VRSLYEDLEDHPNVRKDLERLAQEHIENQRM  211


>Q64259.1 RecName: Full=von Hippel-Lindau disease tumor suppressor; AltName: 
Full=pVHL [Rattus norvegicus]
Length=185

 Score = 318 bits (815),  Expect = 4e-111, Method: Compositional matrix adjust.
 Identities = 154/176 (88%), Positives = 166/176 (94%), Gaps = 2/176 (1%)

Query  38   SGPEESGPEELGAEEEMEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQP  97
            + PEE+  E +   EE+EAGRPRPVLRSVNSREPSQVIFCNRSPRVVLP+WLNFDGEPQP
Sbjct  6    ASPEEA--ERMPGSEEIEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLPLWLNFDGEPQP  63

Query  98   YPTLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYT  157
            YPTLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYT
Sbjct  64   YPTLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYT  123

Query  158  LKERCLQVVRSLVKPENYRRLDIVRSLYEDLEDHPNVQKDLERLTQERIAHQRMGD  213
            LKERCLQVVRSLVKPENYRRLDIVRSLYEDLEDHPNV+KD++RLTQE + +Q +G+
Sbjct  124  LKERCLQVVRSLVKPENYRRLDIVRSLYEDLEDHPNVRKDIQRLTQEHLENQALGE  179


>P40338.1 RecName: Full=von Hippel-Lindau disease tumor suppressor; AltName: 
Full=pVHL [Mus musculus]
Length=181

 Score = 308 bits (790),  Expect = 3e-107, Method: Compositional matrix adjust.
 Identities = 150/172 (87%), Positives = 160/172 (93%), Gaps = 3/172 (2%)

Query  43   SGPEELGAE---EEMEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLPVWLNFDGEPQPYP  99
            + PEE   E   EEMEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLP+WLNFDGEPQPYP
Sbjct  6    ASPEEAAGEPGPEEMEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLPLWLNFDGEPQPYP  65

Query  100  TLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLK  159
             LPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLK
Sbjct  66   ILPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANITLPVYTLK  125

Query  160  ERCLQVVRSLVKPENYRRLDIVRSLYEDLEDHPNVQKDLERLTQERIAHQRM  211
            ERCLQVVRSLVKPENYRRLDIVRSLYEDLED+P+V+KD++RL+QE +  Q +
Sbjct  126  ERCLQVVRSLVKPENYRRLDIVRSLYEDLEDYPSVRKDIQRLSQEHLESQHL  177


>Q6RSH7.1 RecName: Full=von Hippel-Lindau-like protein; Short=VHL-like 
protein; Short=VLP [Homo sapiens]
Length=139

 Score = 157 bits (398),  Expect = 2e-48, Method: Compositional matrix adjust.
 Identities = 84/122 (69%), Positives = 97/122 (80%), Gaps = 0/122 (0%)

Query  32   ESGAEESGPEESGPEELGAEEEMEAGRPRPVLRSVNSREPSQVIFCNRSPRVVLPVWLNF  91
            ++G +E+GPEE   EELGAEEEM A    PVLRSVNSRE S++I CN SPR+VLPVWLN+
Sbjct  14   QAGTQEAGPEEYCQEELGAEEEMAARAAWPVLRSVNSRELSRIIICNHSPRIVLPVWLNY  73

Query  92   DGEPQPYPTLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQTELFVPSLNVDGQPIFANI  151
             G+  PY TL PG   RIH++R H WLFRDA THD LLVNQTELFVPS NV+GQP+FANI
Sbjct  74   YGKLLPYLTLLPGRDFRIHNFRSHPWLFRDARTHDKLLVNQTELFVPSSNVNGQPVFANI  133

Query  152  TL  153
            TL
Sbjct  134  TL  135


>Q9V3C1.1 RecName: Full=Protein Vhl [Drosophila melanogaster]
Length=178

 Score = 41.6 bits (96),  Expect = 0.001, Method: Compositional matrix adjust.
 Identities = 31/116 (27%), Positives = 52/116 (45%), Gaps = 18/116 (16%)

Query  74   VIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQT  133
            V+F N + R +   W+        Y TL P    R++++  H WLFRD  T + + V   
Sbjct  27   VLFANTTYRTLDLYWVCERERENMYLTLKPFEEVRVNTFTTHSWLFRDYYTGERMHVRSQ  86

Query  134  ELFVPS--------------LNVDGQPIFANITLPVYTLKERCLQVV-RSLVKPEN  174
             +F P               ++V  + +   I  P+ +L+E CL +V R L++  N
Sbjct  87   RIFQPIRVRVPKSQQSPDQLVDVRSEVL---IHFPMRSLRENCLWLVARWLIRTSN  139


>Q19213.1 RecName: Full=von Hippel-Lindau tumor suppressor homolog [Caenorhabditis 
elegans]
Length=174

 Score = 39.7 bits (91),  Expect = 0.005, Method: Compositional matrix adjust.
 Identities = 29/91 (32%), Positives = 42/91 (46%), Gaps = 3/91 (3%)

Query  73   QVIFCNRSPRVVLPVWLNFDGEPQPYPTLPPGTGRRIHSYRGHLWLFRDAGTHDGLLVNQ  132
            +V F NR    V   WLN   +P  Y TL       I +++ H W+ R +     +LVN+
Sbjct  27   RVRFLNRCAYPVDVFWLNPSKQPTKYGTLAQKKYLDIKTFKDHPWVARRSFDGCKVLVNE  86

Query  133  TELFVPSLNVDGQPIFAN---ITLPVYTLKE  160
             E+F P        I  N   IT+ V +L+E
Sbjct  87   KEVFWPEPAPRMNLIVRNHCVITMKVQSLRE  117


>P12348.3 RecName: Full=Period circadian protein [Drosophila pseudoobscura 
pseudoobscura]
Length=1271

 Score = 39.7 bits (91),  Expect = 0.015, Method: Composition-based stats.
 Identities = 19/69 (28%), Positives = 34/69 (49%), Gaps = 9/69 (13%)

Query  14   GAEEAGVEEYGPEEDGGEESGAEESGPEESGPEELGAE---------EEMEAGRPRPVLR  64
            GA+ +  + +G +  G + SGA+ SGP+ +GP+  GAE         +      PRP + 
Sbjct  766  GADNSAADNFGADNSGPDNSGADNSGPDNTGPDNSGAENSRAENSRADNSRPDHPRPDIS  825

Query  65   SVNSREPSQ  73
              ++  P +
Sbjct  826  GASNSRPDK  834


>Q12019.1 RecName: Full=Midasin; AltName: Full=Dynein-related AAA-ATPase 
REA1; AltName: Full=MIDAS-containing protein; AltName: Full=Ribosome 
export/assembly protein 1 [Saccharomyces cerevisiae 
S288C]
Length=4910

 Score = 34.7 bits (78),  Expect = 0.67, Method: Composition-based stats.
 Identities = 27/74 (36%), Positives = 34/74 (46%), Gaps = 22/74 (30%)

Query  4     RAENWDEAEVGAEEAGVE------EYGPEEDGGE-------ESGAEE---------SGPE  41
             + E  +E E   +E+G+E      E GPEED GE       E GAEE            E
Sbjct  4284  KEEVGNEDEEVKQESGIESDNENDEPGPEEDAGETETALDEEEGAEEDVDMTNDEGKEDE  4343

Query  42    ESGPEELGAEEEME  55
             E+GPEE    +E E
Sbjct  4344  ENGPEEQAMSDEEE  4357


>O43493.4 RecName: Full=Trans-Golgi network integral membrane protein 2; 
AltName: Full=Trans-Golgi network glycoprotein 46; Short=TGN38 
homolog; Short=hTGN46; AltName: Full=Trans-Golgi network 
glycoprotein 48; Short=hTGN48; AltName: Full=Trans-Golgi network 
glycoprotein 51; Short=hTGN51; AltName: Full=Trans-Golgi 
network protein 2; Flags: Precursor [Homo sapiens]
Length=437

 Score = 33.5 bits (75),  Expect = 1.1, Method: Compositional matrix adjust.
 Identities = 26/70 (37%), Positives = 36/70 (51%), Gaps = 2/70 (3%)

Query  17   EAGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPRPVLRSVNSREPSQVIF  76
            ++G E+  P+ DG  +SGAEE GP + GP + GAEE+     P  V+    SR+      
Sbjct  209  KSGAEKQTPK-DGSNKSGAEEQGPID-GPSKSGAEEQTSKDSPNKVVPEQPSRKDHSKPI  266

Query  77   CNRSPRVVLP  86
             N S    LP
Sbjct  267  SNPSDNKELP  276


>Q6NU09.1 RecName: Full=Volume-regulated anion channel subunit LRRC8E; 
AltName: Full=Leucine-rich repeat-containing protein 8E [Xenopus 
laevis]
Length=806

 Score = 32.3 bits (72),  Expect = 3.2, Method: Composition-based stats.
 Identities = 22/81 (27%), Positives = 37/81 (46%), Gaps = 3/81 (4%)

Query  128  LLVNQTELFVPSLNVDGQPIFANITLPVYTLKERCLQVVRSLVKPENYRRLDIVRSLYED  187
            +LV + EL    L      +F+   L V  LKE  L  +  ++  ++ R+L ++R  +  
Sbjct  592  VLVKELELVRCELERIPHAVFSLTNLQVLDLKENTLHTIEEIISLQHCRKLSVLRLWHNQ  651

Query  188  LE---DHPNVQKDLERLTQER  205
            +    DH    K LE L+  R
Sbjct  652  IAYIPDHIRKLKGLEELSLNR  672


>P41002.2 RecName: Full=Cyclin-F; AltName: Full=F-box only protein 1 [Homo 
sapiens]
Length=786

 Score = 31.6 bits (70),  Expect = 5.8, Method: Compositional matrix adjust.
 Identities = 21/64 (33%), Positives = 36/64 (56%), Gaps = 6/64 (9%)

Query  14   GAEEAGVEEYGPEEDGGEESGAEESGPEESGPEE---LGAEEEMEAG-RPRPVLRSVNSR  69
            G  +  V    PE+   +ES  EE+ PE+ GP++   L  + ++ A   P+P++R+  SR
Sbjct  634  GILDVTVVYLNPEQHCCQESSDEEACPEDKGPQDPQALALDTQIPATPGPKPLVRT--SR  691

Query  70   EPSQ  73
            EP +
Sbjct  692  EPGK  695


>Q64398.1 RecName: Full=Diacylglycerol kinase eta; Short=DAG kinase eta; 
AltName: Full=130 kDa diacylglycerol kinase; AltName: Full=Diglyceride 
kinase eta; Short=DGK-eta [Mesocricetus auratus]
Length=1154

 Score = 31.6 bits (70),  Expect = 5.9, Method: Composition-based stats.
 Identities = 16/51 (31%), Positives = 26/51 (51%), Gaps = 3/51 (6%)

Query  18  AGVEEYGPEEDGGEESGAEESGPEESGPEELGAEEEMEAGRPRPVLRSVNS  68
           AG + + P   GG   G     P  +GP E  ++ E E G P+ ++R V++
Sbjct  4   AGYQHHPP---GGAAVGTSAVSPTAAGPGEDSSDSEAEQGGPQKLIRKVST  51



Lambda      K        H        a         alpha
   0.314    0.136    0.410    0.792     4.96 

Gapped
Lambda      K        H        a         alpha    sigma
   0.267   0.0410    0.140     1.90     42.6     43.6 

Effective search space used: 12900191872


  Database: Non-redundant UniProtKB/SwissProt sequences
    Posted date:  Jan 15, 2022  5:25 AM
  Number of letters in database: 181,270,864
  Number of sequences in database:  478,091



Matrix: BLOSUM62
Gap Penalties: Existence: 11, Extension: 1
Neighboring words threshold: 11
Window for multiple hits: 40

`

function Prueba() {

  useEffect(() => {
    new blasterjs({
      string: alignments,
      multipleAlignments: "blast-multiple-alignments",
      alignmentsTable: "blast-alignments-table",
      singleAlignment: "blast-single-alignment",
   });
  }, [])

  return (
    <div>
      <div id="blast-multiple-alignments"></div>
      <div id="blast-alignments-table"></div>
      <div id="blast-single-alignment"></div>
    </div>
  );
}

export default Prueba;
