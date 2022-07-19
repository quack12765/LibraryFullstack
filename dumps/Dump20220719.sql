-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mylibrary
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Books`
--

DROP TABLE IF EXISTS `Books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Books` (
  `ISBN` varchar(13) NOT NULL,
  `name` tinytext,
  `summary` text,
  `intro` text,
  `author` varchar(30) NOT NULL,
  `publisher` varchar(30) NOT NULL,
  `publish_year` int DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `show_img_url` varchar(2083) DEFAULT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Books`
--

LOCK TABLES `Books` WRITE;
/*!40000 ALTER TABLE `Books` DISABLE KEYS */;
INSERT INTO `Books` VALUES ('9789571378527','槍炮、病菌與鋼鐵：人類社會的命運‧25週年暢銷紀念版','歷史上到底發生了什麼事，讓世界這麼不平等？\n \n　　「我們這個時代的達爾文」賈德‧戴蒙經典不墜之作\n　　最具原創性與影響力的一萬三千年人類簡史','為什麼現代社會中的財富和權力分配，是以今日此種面貌呈現？\n　　為何越過大洋殺戮、征服和滅絕的，不是美洲、非洲的土著，而是歐洲人和亞洲人？\n　　歷史上到底發生了什麼事，導致現代世界的不平等？\n\n　　透過生物地理學、演化生物學、語言學、文化人類學等科學的視野，賈德．戴蒙帶領讀者橫跨一萬三千年，探索不同族群的發展軌跡。本書挑戰了傳統史觀，出版至今傳誦不墜、激起無數討論，本身即是人類文明的重大進展。閱讀本書，不但能明白現代世界的生成，亦將使未來世界的樣貌更為明晰。\n\n　　／建構人類文明的發展軌跡　剖析社會不平等的起源\n\n　　今天的世界現況，其實早在一萬三千年前就決定了。\n　　賈德．戴蒙做出了重要的提醒：各洲社會、文化的巨大歧異不在生物基因本身，而在環境的差異。他嘗試探討主宰人類社會的關鍵，認為各大洲「自然資源」的不平等，正是造就至今社會文明發展落差的主因。從本書作者三十多年的思考脈絡中，不僅解釋了「槍炮、病菌與鋼鐵」何以成為文明擴張、族群鬥爭的利器，更闡述了地理環境條件為什麼足以決定人類的歷史命運。','賈德‧戴蒙','時報出版',2019,0,'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/006/97/0010069715.jpg&v=4bdab719k&w=348&h=348'),('9789865251024','灰階思考','黑白之間都是灰，找到無限價值的所在。\nPodcast冠軍節目股癌製作人謝孟恭首本力作！','這時代不缺資訊，而是判讀力！\n　　想要在投資市場生存，你需要的是一整個工具箱，\n　　以及跳脫黑白框架的灰階思考力！\n　　Podcast 冠軍節目「股癌」製作人謝孟恭，\n　　首度分享他的灰階思考力，幫助你從根本建立投資觀念，\n　　找到價值的所在，靠自己成為理財專家！\n\n　　窮人想賭博翻身，富豪想保本成長。沒有判讀力，你可能可以賭中幾次，但終究抗拒不了誘惑，最終那些靠運氣贏來的，都會靠實力輸回去。而錯誤認知就如同錯誤的飛行儀表版，即便飛機性能再好，也很可能會讓你與目標背道而馳，甚至墜落於茫茫大海。投資理財不難，唯判讀力和克服人性而已。不斷的閱讀、思考、回測，就是一種判讀力的鍛鍊，讓我們大腦擁有新的作業系統。而投資理財如同人生，沒有黑與白絕對的答案，最佳的解答，往往存在帶狀的灰色色階中。\n\n　　市場是任何人都可以輕鬆加入，並把畢生積蓄賠光的地方，不要急於幾天內就要拚個你死我活。先蹲著才能跳更高，但也不要蹲到腳麻後來完全跳不起來，實際進市場的磨練才是重點。但面對市場你要：\n\n　　樂觀，但不是傻天真；\n　　耐心，要翻倍，但不要翻車；\n　　行動，並樂於承擔風險！','謝孟恭','天下文化',2021,0,'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/088/84/0010888435.jpg&v=60815e45k&w=348&h=348'),('9789869422642','投資最重要的事：一本股神巴菲特讀了兩遍的書','巴菲特：這本書，我讀了兩遍！\n華爾街日報：他的備忘錄，媲美波克夏的股東大會。\n價值投資者必讀經典—霍華•馬克斯20項投資法則','在美國投資界與巴菲特齊名的霍華．馬克斯，其所聯合創辦的橡樹資本成立時間超過二十年，管理資產規模已達千億美元，其長期績效表現更是驚人，二十八年來（包含六位創辦人任職TCW時期）平均複合報酬率高達一九%（同期美股標準普爾五百指數表現只有一○‧一%，MSCI全球指數只有四‧九%）。也就是說，如果在二十八年前將一百萬交給橡樹資本管理，現在已擁有一億七千萬。\n\n　　霍華．馬克斯從不吝於和市場分享其投資洞見，持續以「投資備忘錄」與客戶及所有投資人溝通。橡樹備忘錄受到美國投資界高度重視，地位等於巴菲特波克夏每年股東大會，連巴菲特本人也罕見背書：「只要在郵件信箱裡看到霍華．馬克斯的投資備忘錄，我會馬上打開與閱讀！」\n\n　　《投資最重要的事》一書公開「橡樹資本持續擁有打敗大盤的卓越表現」的答案。霍華．馬克斯濃縮歷年備忘錄及價值投資心得，總結為二十項原則，包涵著名的「第二層思考」、價格與價值的關系、耐心等待機會、避開投資陷阱、對抗情緒帶來的負面影響……含括所有價值投資者的關鍵面向，處處都是洞見與啟發。\n\n【學習第二層思考】\n第一層思考簡單、膚淺，幾乎人人做得到；\n第二層思考則比較深入、複雜，而且迂迴。\n掌握第二層思考、打敗市場的關鍵是高度的洞察力。\n\n【注意景氣循環】\n我們相信以下兩個概念：\n法則1：多數事物都有週期。\n法則2：在其他人忘記法則1時，就是產生獲利和虧損的最大機會。\n\n【在泡沫中避免虧損】\n在這種關鍵時刻要拒絕投資：\n貪婪和人性偏誤造成利多消息廣泛宣傳，使股價受到高估；\n或是利空消息被忽視時。\n\n　　本書舊版上市已成為投資者人手一本的案頭書，新版加值收錄四位投資名家克里斯多夫‧戴維斯、喬爾‧葛林布萊特、保羅‧喬森、賽斯‧卡拉曼評注，以及作者新的洞察。華爾街「投資大師中的大師」布魯斯‧葛林瓦德做序盛讚：「《投資最重要的事升級版》是集當代五位最佳投資思想家大成的作品。」這本匯集當世投資智慧精華的書，就是霍華．馬克斯獻給投資人最慷慨的禮物。\n\n◎本書特色\n\n1. 股神巴菲特也讀兩遍的投資寶典！\n巴菲特開郵件信箱必看他的投資備忘錄、約翰‧伯格盛讚「想避開投資陷阱必讀」——公認投資大師霍華．馬克斯四十多年淬練的投資智慧，全世界的投資人，從新手到骨灰級投資者，補腦必讀！\n\n2. 教你「第二層思考」，精準評估市場機會和風險\n市場混沌詭譎、景氣一片迷霧，根據眼前的資訊判斷，永遠只落於人後，贏家必須有比表象更加深入的「第二層思考」，霍華．馬克斯教你：「想到別人沒想過的事情，看到他們錯過的東西，擁有他們沒有的洞見，然後用不同的方式對應」。\n\n3. 新版增加一章及四位名家評注筆記！\n新版擴充第二十章「合理預期」主題，且罕見加入四位知名投資專家學者評註，作者本人也加入解說，集五位最佳投資思想家大成，內容更豐富、面向更多元，讀者更能從真知灼見中獲取大師的智慧。\n\n4. 與大師對話，寫出每個人的投資致勝方法\n每位讀者都能不僅能用心捧讀、親身體會，更能參與投資名家臨場討論，在頁面上加上自己的心得，自然能形成專屬個人的一套投資模式，讓本書變成你自己的投資致勝寶典。\n\n◎名人推薦\n華倫‧巴菲特（波克夏海瑟威董事長暨執行長）\n布魯斯‧葛林瓦德（華爾街大師中的大師）\n約翰‧伯格（先鋒集團創辦人暨執行長）\n謝劍平（台灣科技大學財務金融所教授、前中華電信財務長）\n雷浩斯（價值投資者、財經作家）\n財報狗（台灣最大的基本面資訊平台與社群）\n\n「如果你是價值投資新手，看這本書可能不會有太深刻的感觸，但當你踏入價值投資的旅程一段時間後，你會發現他早就對旅途上的問題做出說明。如果你是價值投資老手，會發現他對你曾百思不解的問題做出清楚地整理、釐清問題的盲點，你只能讚嘆他的理性邏輯。《投資最重要的事》足以成為價值投資哲學類的標準教科書，每個人都該修這堂課。」─雷浩斯，價值投資者、財經作家\n\n「只要在郵件信箱裡看到霍華‧馬克斯的投資備忘錄，我會馬上打開與閱讀。我總是會從中學到一些事情，他的書我讀了兩遍。」─華倫‧巴菲特（Warren Buffett）波克夏海瑟威（Berkshire Hathaway）董事長暨執行長\n\n「投資書籍中，很少有像馬克斯《投資最重要的事》一樣樹立著高標準，這本書充滿機智、風趣，而且扣緊歷史觀點。如果你想避開投資陷阱，這是必讀的作品。」─約翰‧伯格（John C. Bogle）先鋒集團（The Vanguard Group）創辦人暨執行長\n\n「每個人都引頸期盼華倫‧巴菲特每年給股東的信，某些華爾街投資人則對霍華‧馬克斯的文章有同樣高的期待。」─彼得‧拉特曼（Peter Lattman）《華爾街日報》（Wall Street Journal）\n\n「霍華‧馬克斯的投資備忘錄中有著基本真理和獨到見解，定期收到的人都熱切期待。現在，這位偉大的投資人要把智慧和經驗分享給大家。《投資最重要的事》就是馬克斯富含深刻見解的投資哲學與經過時間考驗的投資方法，這是每個投資人都必讀的書。」\n─賽斯‧卡拉曼（Seth A. Klarman）美國避險基金包波斯特集團（The Baupost Group）董事長','霍華．馬克斯','商業周刊',2017,0,'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/074/49/0010744933.jpg&v=58a6d0d2k&w=348&h=348');
/*!40000 ALTER TABLE `Books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Borrow`
--

DROP TABLE IF EXISTS `Borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Borrow` (
  `accession_number` varchar(20) DEFAULT NULL,
  `account` varchar(10) DEFAULT NULL,
  `borrow_date` date DEFAULT NULL,
  KEY `account` (`account`),
  KEY `accession_number` (`accession_number`),
  CONSTRAINT `Borrow_ibfk_2` FOREIGN KEY (`account`) REFERENCES `account` (`account`),
  CONSTRAINT `Borrow_ibfk_3` FOREIGN KEY (`accession_number`) REFERENCES `Copy` (`accession_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Borrow`
--

LOCK TABLES `Borrow` WRITE;
/*!40000 ALTER TABLE `Borrow` DISABLE KEYS */;
INSERT INTO `Borrow` VALUES ('31715000765694','admin','2022-07-18'),('31707000756393','admin','2022-07-18'),('31708001003598','admin','2022-07-18');
/*!40000 ALTER TABLE `Borrow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Copy`
--

DROP TABLE IF EXISTS `Copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Copy` (
  `accession_number` varchar(20) NOT NULL,
  `location` varchar(20) DEFAULT NULL,
  `call_number` varchar(20) DEFAULT NULL,
  `state` tinyint DEFAULT NULL,
  `reservation` int DEFAULT NULL,
  `ISBN` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`accession_number`),
  KEY `ISBN` (`ISBN`),
  CONSTRAINT `Copy_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Books` (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Copy`
--

LOCK TABLES `Copy` WRITE;
/*!40000 ALTER TABLE `Copy` DISABLE KEYS */;
INSERT INTO `Copy` VALUES ('31707000755774','南區開架閱覽區','563.5 7144 c.1',0,0,'9789869422642'),('31707000756393','南區開架閱覽區','563.52 0414 c.1',0,0,'9789865251024'),('31708001003598','北區開架閱覽區','563.52 0414 c.1',0,0,'9789865251024'),('31714000600790','北屯開架閱覽區','563.52 0414 c.1',0,0,'9789865251024'),('31715000765694','總館開架閱覽區','541.3 4344 2019',0,0,'9789571378527'),('31715000793368','總館開架閱覽區','563.5 7144 c.2',0,0,'9789869422642');
/*!40000 ALTER TABLE `Copy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reserve`
--

DROP TABLE IF EXISTS `Reserve`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reserve` (
  `accession_number` varchar(20) DEFAULT NULL,
  `account` varchar(10) DEFAULT NULL,
  `reserve_date` date DEFAULT NULL,
  KEY `accession_number` (`accession_number`),
  KEY `account` (`account`),
  CONSTRAINT `Reserve_ibfk_1` FOREIGN KEY (`accession_number`) REFERENCES `Copy` (`accession_number`),
  CONSTRAINT `Reserve_ibfk_2` FOREIGN KEY (`account`) REFERENCES `account` (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reserve`
--

LOCK TABLES `Reserve` WRITE;
/*!40000 ALTER TABLE `Reserve` DISABLE KEYS */;
INSERT INTO `Reserve` VALUES ('31715000765694','admin','2022-07-18');
/*!40000 ALTER TABLE `Reserve` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `job_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dept` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `role` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `sex` tinyint DEFAULT NULL,
  `city` varchar(15) DEFAULT NULL,
  `region` varchar(15) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('admin','8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918','admin','1900160','','admin',NULL,NULL,NULL,NULL,NULL,NULL),('user','04f8996da763b7a969b1028ee3007569eaf3a635486ddab211d512c85b9df8fb','user','1900158','','user',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-19 10:50:37
