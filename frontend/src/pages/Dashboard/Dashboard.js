import React from "react";
import { useAuth } from "../../hooks/useAuth";
import classes from "./dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        {allItems
          .filter((item) => user.isAdmin || !item.forAdmin)
          .map((item) => (
            <Link
              to={item.url}
              style={{
                backgroundColor: item.bgColor,
                color: item.color,
              }}
            >
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

const allItems = [
  {
    title: "Блюда",
    imageUrl: "/icons/orders.svg",
    url: "/dishes",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Пользователи",
    imageUrl: "/icons/profile.svg",
    url: "/profile",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Продукты",
    imageUrl: "/icons/profile.svg",
    url: "/products",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Специальности",
    imageUrl: "/icons/profile.svg",
    url: "/specializations",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Повара",
    imageUrl: "/icons/profile.svg",
    url: "/cookers",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Единицы измерения",
    imageUrl: "/icons/profile.svg",
    url: "/unit",
    bgColor: "#1565c0",
    color: "white",
  },
  {
    title: "Users",
    imageUrl: "/icons/users.svg",
    url: "/admin/users",
    forAdmin: true,
    bgColor: "#00bfa5",
    color: "white",
  },
  {
    title: "Foods",
    imageUrl: "/icons/foods.svg",
    url: "/admin/foods",
    forAdmin: true,
    bgColor: "#e040fb",
    color: "white",
  },
];
