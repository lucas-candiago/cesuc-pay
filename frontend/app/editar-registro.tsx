import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { Ionicons } from '@expo/vector-icons'
import axiosAPI from './services/axios'
import { categories } from './mocks/categories'
import { useContext } from 'react'
import AuthContext from './contexts/AuthContext'

export default function EditScreen () {
  const router = useRouter()

  const {fetchTransactions} = useContext(AuthContext)

  const { transactionId } = useLocalSearchParams<{ transactionId?: string }>()

  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)

  const [openCategory, setOpenCategory] = useState(false)
  const [category, setCategory] = useState(null)
  const [categoryItems, setCategoryItems] = useState(categories)

  const [openType, setOpenType] = useState(false)
  const [type, setType] = useState(null)
  const [typeItems, setTypeItems] = useState([
    { label: 'Despesa', value: 'despesa' },
    { label: 'Receita', value: 'receita' }
  ])

  useEffect(() => {
    axiosAPI.get(`transactions/${transactionId}`).then(res => {
      setDescription(res.data.description)
      setDate(new Date(res.data.date))
      setCategory(res.data.category)
      setType(res.data.type)
      setPrice(res.data.price)
    })
  }, [transactionId])

  const handleSubmit = async () => {
    const res = await axiosAPI.put(`transactions/edit/${transactionId}/`, {
      description,
      type,
      date,
      category,
      price
    })

    if (res.status == 200) {
      fetchTransactions()
      router.back()
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.returnText} onPress={() => router.back()}>
        <Ionicons name='chevron-back' size={24} />
        <Text>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Editar Transação</Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder='Iphone 16'
        placeholderTextColor='#aaa'
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Text style={{ color: '#333' }}>
          {date.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode='date'
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date
            setShowDatePicker(Platform.OS === 'ios')
            setDate(currentDate)
          }}
        />
      )}

      <Text style={styles.label}>Categoria</Text>
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categoryItems}
        setOpen={setOpenCategory}
        setValue={setCategory}
        setItems={setCategoryItems}
        placeholder='Selecione uma categoria'
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={openCategory ? 3000 : 1000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Tipo</Text>
      <DropDownPicker
        open={openType}
        value={type}
        items={typeItems}
        setOpen={setOpenType}
        setValue={setType}
        setItems={setTypeItems}
        placeholder='Selecione o tipo'
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={openType ? 3000 : 1000}
        zIndexInverse={1000}
      />

      <Text style={styles.label}>Valor</Text>
      <TextInput
        style={styles.input}
        placeholder='R$ 0,00'
        placeholderTextColor='#aaa'
        keyboardType='numeric'
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.createBtn} onPress={handleSubmit}>
        <Text style={styles.createText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfe7e2',
    padding: 24,
    paddingTop: 80
  },
  returnText: {
    fontSize: 16,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    color: '#007AFF'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#ccc'
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ccc'
  },
  input: {
    height: 50,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    justifyContent: 'center'
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20
  },
  createBtn: {
    backgroundColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16
  },
  createText: {
    color: '#fff',
    fontSize: 16
  },
  backBtn: {
    borderWidth: 1,
    borderColor: '#2e5748',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center'
  },
  backText: {
    color: '#2e5748',
    fontSize: 16
  }
})
