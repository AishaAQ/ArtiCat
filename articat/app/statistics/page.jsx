
import { React } from 'react'
import styles from "@/app/page.module.css";
import Card from "@/app/components/Card"
import Top3Chart from "@/app/components/Top3Chart"
import Top3Details from "@/app/components/Top3Details"
import CustomersPerCountry from "@/app/components/CustomersPerCountry";
import MonthlyRevenuePerCategory from "@/app/components/MonthlyRevenuePerCategory";
import Top5Clicks from "@/app/components/Top5Clicks";
import TopClicksDetails from "@/app/components/TopClicksDetails";
import Header from "@/app/components/Header"
import articatRepo from "@/app/repo/articat-repo"
import TopContributingCompanies from "@/app/components/TopContributingCompanies";

const ArtiCatRepo = new articatRepo()

export default async function Statistics() {

  const itemids = await ArtiCatRepo.getTop3PurchasedProducts()
  const itemsdetails = await ArtiCatRepo.getitemsDetails(itemids)
  const customersCount = await ArtiCatRepo.getTotalNumberOfCustomersPerCountry()
  const monthlyCategoryRevenue = await ArtiCatRepo.getMonthlyRevenueOfProductsByCategory()
  const clicksOfItem = await ArtiCatRepo.getTopFiveMostClickedProducts()

  const top3CompanyUN = await ArtiCatRepo.getTop3Companies()
  const top3Companies = await ArtiCatRepo.getCompanyDetails(top3CompanyUN)




  return (
    <>
      
      <Header />

      <div className={styles.padding}>


        <div className={styles.noCard} id="basic">
          <Card> </Card>
        </div>

        <div id="monthly">
          <h2 className={styles.charttitle}>Monthly Revenue Per Category</h2>
          <div className={styles.centered}>
            <MonthlyRevenuePerCategory monthlyCategoryRevenue={monthlyCategoryRevenue} />
          </div>
        </div>

        <h2 className={styles.charttitle} id="topProducts">Top 3 Most Bought Products</h2>
        <p className={styles.chartp}>-Over the last 6 months-</p>
        <div className={styles.top3}>
          <Top3Chart top3Items={itemsdetails} className={styles.chartSpace} />
          <Top3Details top3Items={itemsdetails} />
        </div>

        <div className={styles.twoCards}>
          <div id="country">
            <h2 className={styles.charttitle}>Customers Per Country</h2>
            <div className={styles.centered}>
              <CustomersPerCountry customersPerCountry={customersCount} />
            </div>
          </div>



          <div id="topCompanies">
            <h2 className={styles.charttitle}>Top Contributing Companies</h2>
            <div className={styles.top3}>
              <TopContributingCompanies top3Companies={top3Companies} />
            </div>

          </div>

        </div>


        <h2 className={styles.charttitle} id="topClicked">Top 5 Most Clicked Products</h2>
        <div className={styles.top5}>
          <Top5Clicks top5Clicks={clicksOfItem} />
          <TopClicksDetails top3Items={clicksOfItem} />
        </div>
      </div>


    </>



  )
}
