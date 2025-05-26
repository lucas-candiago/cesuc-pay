import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    visible: boolean
    onCancel: () => void
    onConfirm: () => void
}

export default function DeleteModal({ visible, onCancel, onConfirm }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Excluir Registro</Text>
          <Text style={styles.modalMessage}>
            Tem certeza de que deseja excluir este registro?
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onConfirm}
            >
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#F4F7F5',
    padding: 25,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#D8E3DA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#5BA87F',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#C40000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
