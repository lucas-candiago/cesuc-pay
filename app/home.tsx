import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const transactions = [
  {
    id: '1',
    title: 'Nike Air Max 2090',
    date: '15 Fev 2025',
    amount: 'R$680,00',
    type: 'saida'
  },
  {
    id: '2',
    title: 'iPad Pro 2020',
    date: '10 Fev 2025',
    amount: 'R$9.000,00',
    type: 'saida'
  },
  {
    id: '3',
    title: 'Uber',
    date: '5 Fev 2025',
    amount: 'R$50.00',
    type: 'entrada'
  },
  {
    id: '4',
    title: 'Macbook air',
    date: '9 Mai 2025',
    amount: 'R$50.00',
    type: 'saida'
  }
]

export default function App () {
  const router = useRouter()

  const [selectedTab, setSelectedTab] = useState("Hoje")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, Arthur</Text>
          <Text style={styles.title}>Início</Text>
        </View>
        <TouchableOpacity style={styles.profileIcon}>
          <Ionicons name='person-outline' size={24} color='black' />
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Gasto</Text>
        <Text style={styles.totalValue}>R$25.520,00</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setSelectedTab("Hoje")} style={selectedTab == "Hoje" ? [styles.tab, styles.tabActive] : styles.tab}>
          <Text style={selectedTab == "Hoje" ? [styles.tabText, styles.tabTextActive] : styles.tabText}>Hoje</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Semanal")} style={selectedTab == "Semanal" ? [styles.tab, styles.tabActive] : styles.tab}>
          <Text style={selectedTab == "Semanal" ? [styles.tabText, styles.tabTextActive] : styles.tabText}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab("Mensal")} style={selectedTab == "Mensal" ? [styles.tab, styles.tabActive] : styles.tab}>
          <Text style={selectedTab == "Mensal" ? [styles.tabText, styles.tabTextActive] : styles.tabText}>Mensal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.transactionHeader}>
        <Text style={styles.transactionTitle}>Transações</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>Ver Tudo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    item.type === 'saida' ? '#C40000' : '#5BA87F'
                }
              ]}
            />
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>{item.title}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.type === "saida" ? "-" : "+"}{item.amount}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/adicionar-registro')}
      >
        <Feather name='plus' size={28} color='#fff' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe7e2',
    padding: 20,
    paddingTop: 80
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  greeting: {
    color: '#7C7C7C',
    fontSize: 14
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -5
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalContainer: {
    backgroundColor: '#2e5748',
    borderRadius: 20,
    padding: 20,
    marginTop: 20
  },
  totalLabel: {
    color: '#fff',
    fontSize: 14
  },
  totalValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9F4EB',
    borderRadius: 20,
    padding: 5,
    marginTop: 20
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 15
  },
  tabText: {
    color: '#5BA87F',
    fontWeight: '500'
  },
  tabActive: {
    backgroundColor: '#fff'
  },
  tabTextActive: {
    color: '#000'
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  viewAll: {
    color: '#007AFF'
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12
  },
  transactionName: {
    fontSize: 16
  },
  transactionDate: {
    fontSize: 12,
    color: '#7C7C7C',
    marginTop: 2
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600'
  },
  addButton: {
    backgroundColor: '#2e5748',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 30,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5
  }
})
