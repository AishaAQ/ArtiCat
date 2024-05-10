import React from 'react'
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill, BsBuildingsFill }
    from 'react-icons/bs'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line }
    from 'recharts';
import styles from "@/app/page.module.css";
import articatRepo from "@/app/repo/articat-repo"
const AtriCatRepo = new articatRepo()

export default async function Card() {

    const customersno = await AtriCatRepo.getTotalNumberOfCustomers()
    const categoriesno = await AtriCatRepo.getTotalNumberOfCategories()
    const productsno = await AtriCatRepo.getTotalNumberOfProducts()
    const sellersno = await AtriCatRepo.getTotalNumberOfSellers()
    return (
        <div>
            <div className={styles.maincards}>
                <div className={styles.card}>
                    <div className={styles.cardinner}>
                        <h3>PRODUCTS</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{productsno}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardinner}>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{categoriesno}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardinner}>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{customersno}</h1>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardinner}>
                        <h3>COMPANIES</h3>
                        <BsBuildingsFill className='card_icon' />
                    </div>
                    <h1>{sellersno}</h1>
                </div>
            </div>
        </div>

    )
}
