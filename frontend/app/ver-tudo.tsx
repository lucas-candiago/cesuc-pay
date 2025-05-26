import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import DeleteModal from './components/DeleteModal'
import { transactions } from './mocks/transactions'


export default function ExpensesScreen () {
  const router = useRouter()

  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleDeletePress = (id: string) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = () => {
    console.log('Excluído id:', selectedId)
    setShowModal(false)
    setSelectedId(null)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name='chevron-back' size={24} color='black' />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Despesas</Text>

      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
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
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.type === 'saida' ? '#C40000' : '#5BA87F' }
                ]}
              >
                {item.type === "saida" ? "-" : "+"}{item.amount}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/editar-registro')}
              >
                <Feather name='edit-2' size={16} color='#5BA87F' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}  onPress={() => handleDeletePress(item.id)}>
                <Feather name='trash' size={16} color='#C40000' />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/adicionar-registro')}
      >
        <Feather name='plus' size={28} color='#fff' />
      </TouchableOpacity>

      <DeleteModal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8E3DA',
    padding: 20,
    paddingTop: 80
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  backText: {
    fontSize: 16,
    color: 'black'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
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
    fontSize: 16,
    fontWeight: '600'
  },
  transactionDate: {
    fontSize: 12,
    color: '#7C7C7C',
    marginTop: 2
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5
  },
  actions: {
    flexDirection: 'row',
    gap: 10
  },
  actionButton: {
    backgroundColor: '#F4F7F5',
    padding: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2
  },
  addButton: {
    backgroundColor: '#5BA87F',
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
